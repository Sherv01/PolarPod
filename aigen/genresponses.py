import os
import google.generativeai as genai
import google.cloud.texttospeech as tts
import typing
import json
import re
from dotenv import load_dotenv
import boto3

load_dotenv()

def generate_news(summaries): 
    genai.configure(api_key=os.getenv('API_KEY'))

    # output format (dictionary)
    class NewsSummary(typing.TypedDict):
        left: list[str]
        center: list[str]
        right: list[str]
        brainrot: str

    model = genai.GenerativeModel(
        "gemini-1.5-flash",
        system_instruction="""You are a smart journalist capable of identifying biases in news reports. 
        You are given a summary of right-wing and left-wing coverage for a certain news article. 
        Please:
        1. Separate the news summaries into three categories: left, center (unbiased similarities between left/right), and right. 
        2. Create a LIST of max 6 short points for each.
        3. Create a medium to long (15-20 lines) Gen Alpha brainrot language summary: similar to how it might be discussed on TikTok/Discord/etc, with slang and a conversational style.
        eg. Instead of 'fiscal responsibility,' use 'keeping your wallet fat'; Instead of 'economic downturn,' use 'the economy is crashing harder than my grades'
        Showcase all important viewpoints one by one, first center then left and right."""
    )

    # generate response conforming to format
    response = model.generate_content(
        "Right summary: " + summaries["right_wing"] + "\nLeft summary: " + summaries["left_wing"] + "\nRemember to provide a LIST of points for each bias",
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json", response_schema=NewsSummary
        ),
    )

    # convert text to dictionary and print for testing
    response_text = re.sub(r'[^\x00-\x7F]+', '', response.text)
    responsedict = json.loads(response_text)
    return responsedict

# def list_voices(language_code=None):
#     client = tts.TextToSpeechClient()
#     response = client.list_voices(language_code=language_code)
#     voices = sorted(response.voices, key=lambda voice: voice.name)

#     print(f" Voices: {len(voices)} ".center(60, "-"))
#     for voice in voices:
#         languages = ", ".join(voice.language_codes)
#         name = voice.name
#         gender = tts.SsmlVoiceGender(voice.ssml_gender).name
#         rate = voice.natural_sample_rate_hertz
#         print(f"{languages:<8} | {name:<24} | {gender:<8} | {rate:,} Hz")


def text_to_wav(ai_summaries: dict):
    # define tts parameters
    voice_name = "en-US-Wavenet-C"
    language_code = "-".join(voice_name.split("-")[:2])
    voice_params = tts.VoiceSelectionParams(
                language_code=language_code, name=voice_name
            )
    audio_config = tts.AudioConfig(
                audio_encoding=tts.AudioEncoding.LINEAR16,
                pitch=-6.8,
                speaking_rate=1.38
            )
    client = tts.TextToSpeechClient.from_service_account_json('.gcloud/servicekey.json')
    
    # create brainrot tts and save to .wav file
    text_input = tts.SynthesisInput(text=ai_summaries["brainrot"])

    response = client.synthesize_speech(
        input=text_input,
        voice=voice_params,
        audio_config=audio_config,
    )
    filename = f"audio/brainrot.mp3"

    with open(filename, "wb") as out:
        out.write(response.audio_content)
        print(f'Generated speech saved to "{filename}"')
    # Replace with your AWS credentials and bucket name
    aws_access_key_id = 'YOUR_ACCESS_KEY_ID'
    aws_secret_access_key = 'YOUR_SECRET_ACCESS_KEY'
    bucket_name = 'brainrot-media-bucket'
    file_path = filename

    

    # Create an S3 client
    s3 = boto3.client('s3', 
                    aws_access_key_id="os.getenv('AWS_KEY')", 
                    aws_secret_access_key="os.getenv('AWS_SECRET_KEY')")

    # Upload the file to S3
    try:
        s3.upload_file(file_path, bucket_name, 'uploaded_file.mp3') 
        print(f"File uploaded to s3://{bucket_name}/uploaded_file.mp3")
    except Exception as e:
        print(f"Error uploading file: {e}")

 

# testing: sample article summary to be replaced by input
# summaries = {
#     'right_summary': "Incoming President Donald Trump's administration plans to initiate aggressive raids on illegal immigrants as early as the first day of his presidency. The raids, led by Trump's 'border tsar' Tom Homan, aim to target criminals and gang members in 'sanctuary' cities such as Chicago, New York, Los Angeles, and Miami. This action aligns with Trump's promise of the largest deportation program in U.S. history, focusing on upholding the law and removing illegal migrants, including those with criminal backgrounds, from the country. These raids are seen as a necessary step to prioritize national security and protect American citizens. The operation is expected to begin with targeting migrants who have committed crimes, but there are concerns about the challenges of managing detainees given limited custody space.",
#     'left_summary': "As Donald Trump's administration takes charge, plans for large-scale raids on undocumented migrants have sparked fear and controversy. His 'border tsar,' Tom Homan, has indicated that the raids, likely beginning in cities with significant immigrant populations like Chicago, will focus on criminals and gang members. However, there are concerns that the broad scope of the raids could also target long-standing immigrants who have no criminal history. This aggressive approach to immigration contradicts the Biden administration's more lenient policies, which prioritized deporting individuals who posed serious threats. Critics argue that these raids will cause unnecessary fear and trauma among immigrant communities, especially in sanctuary cities that protect undocumented residents. Furthermore, the potential dismantling of sanctuary policies and the resumption of workplace raids are seen as attacks on the rights of migrant workers and families."}

summaries = {'right_wing': "This Fox News summary covers a range of topics related to President-elect Donald Trump's impending return to office.  The segments include discussions on pre-inauguration protests (described as orchestrated, not grassroots), state-level preparations for the Trump administration, reactions to the Israel-Hamas ceasefire and hostage deal, Georgia's new government and its relationship with Trump, Trump's potential legislative agenda,  potential gubernatorial campaigns,  the confirmation hearing of Trump's defense secretary nominee Pete Hegseth, anticipated changes to Inauguration Day and the first 100 days of the administration, and a reaction to the Supreme Court's TikTok ruling. President-elect Trump plans a large-scale immigration raid in Chicago, starting Tuesday, as a symbolic first step in his mass deportation efforts.  The operation, involving 100-200 ICE officers, will prioritize deporting undocumented immigrants with criminal records but will also detain others encountered during the raids. Chicago was chosen due to its sanctuary city policies, which Mayor Johnson and Governor Pritzker have defended, prohibiting local police from cooperating with ICE.  Despite this, Chicago agencies have been instructed not to impede ICE operations.  The raid is intended to serve as a warning to other sanctuary cities. President-elect Trump plans a large-scale immigration raid in Chicago on Tuesday, targeting illegal immigrants, particularly those with criminal records.  The operation, involving 100-200 ICE officers, is intended as a model for nationwide deportations.  Chicago was chosen due to its sanctuary city policies, which Mayor Johnson and Governor Pritzker have defended by prohibiting city agencies from cooperating with ICE.  Despite this, city agencies are barred from allowing ICE access to their facilities, and the Chicago Police Department, while stating it won't interfere with federal agencies, also claims it doesn't document immigration status.  Incoming border czar Tom Homan has threatened to prosecute Mayor Johnson if he impedes the operation. This is not an article; it's a promotional blurb encouraging users to sign up for a news email alert service covering news, politics, and culture.", 'left_wing': 'This NPR news summary covers the period leading up to Donald Trump\'s second presidential inauguration in January 2025.  The reports detail concerns about his potential policies, including aggressive immigration restrictions, a focus on military AI development, and potential pardons for January 6th participants.  Legal issues are highlighted, such as the Department of Justice\'s report on election interference (which would have led to a conviction were it not for his election win) and the implications of his New York hush-money case.  His national security team appointments and his controversial statements regarding Greenland, the Panama Canal, and Canada are also mentioned.  Finally, public opinion polls suggest a less certain mandate for Trump than he claims, and expert analysis covers various aspects of his potential second term, including the war in Ukraine and the future of green energy. President-elect Donald Trump plans to broker a peace deal in Ukraine within six months, a timeline his envoy to Ukraine, Keith Kellogg, shortens to 100 days.  However, peace remains elusive.  Russia, having made slow but steady territorial gains in eastern and southern Ukraine throughout 2024, demands that any deal recognize these gains, including the annexed regions of Donetsk, Luhansk, Zaporizhzhia, and Kherson, and that Ukraine renounce its NATO aspirations.  Russia also seeks the lifting of Western sanctions.  Ukraine, while initially demanding full Russian withdrawal, has softened its stance, but insists on strong Western security guarantees and potentially Western peacekeepers.  While Zelenskyy has also shifted away from demanding full territorial withdrawal as a precondition for talks, he also wants a comprehensive peace agreement rather than a temporary ceasefire.  Both sides are dug into their positions, leaving little room for compromise.  \n\nRussia\'s military advances, coupled with Ukraine\'s manpower shortages and desertions, leave Ukraine in a precarious position.  While Russia aims for physical exhaustion of the Ukrainian military, Ukraine\'s incursion into Russia\'s Kursk region (with alleged North Korean troop involvement) attempts to shift the momentum.  \n\nObservers are divided on the outcome.  Some believe Trump will pressure Putin to end hostilities, escalating sanctions and military aid if necessary.  Others are skeptical, predicting Putin will intensify efforts to consolidate gains and secure favorable terms, including restrictions on Ukraine\'s future military capacity and its relationship with the West.  A failure to reach a deal raises concerns about the possibility of direct conflict between Russia and the United States. President-elect Trump\'s administration plans to begin large-scale deportations, starting with a focus on over 300 individuals with histories of violent crimes in the Chicago area.  This operation, expected to begin soon, will target a wider net than previous administrations, potentially including those not directly targeted but found to be in the country illegally.  Incoming Border Czar Tom Homan stated that enforcement will be nationwide and prioritize public safety threats, but no one will be "off the table."  While the exact timing and locations are being kept under wraps, Trump confirmed the deportations will begin swiftly.  Chicago, a sanctuary city, has strengthened its protections for undocumented immigrants, leading to anticipation and preparations from immigrant advocacy groups who are informing their communities about their rights and ICE\'s operational tactics.  Local Democratic officials have urged calm and encouraged immigrants to know their rights.  Potential weather delays are a concern. President-elect Donald Trump returned to Washington D.C. on January 18th, 2025, for his second inauguration.  He celebrated with family and supporters at his Trump National Golf Club in Virginia, featuring fireworks and a speech where he mentioned several key figures, including his Mideast envoy who recently negotiated a ceasefire.  Due to expected frigid temperatures, the inauguration ceremony was moved from the Capitol steps to the Capitol Rotunda, marking the first indoor swearing-in since 1985.  While Trump celebrated, protests, though smaller than his first inauguration, took place.  Trump confirmed plans for immediate executive actions upon taking office, including a potential TikTok extension and mass deportations.  His second inauguration will include a more celebrity-studded and tech-heavy presence compared to his first, and his planned inaugural address will focus on "unity, strength, and fairness."  Despite the cold weather shifting many events indoors, a series of inaugural balls are still planned.'}

ai_summaries = generate_news(summaries)
print(json.dumps(ai_summaries, indent=4))
# list_voices("en")
text_to_wav(ai_summaries)
