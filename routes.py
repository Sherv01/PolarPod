from flask import Blueprint, request, jsonify, render_template
from app.scrape import Scraper

# Define the blueprint
routes_blueprint = Blueprint('routes', __name__)

# Define the home route within the blueprint
@routes_blueprint.route('/')
def home():
    return render_template('index.html')

# Define the analyze route within the blueprint
@routes_blueprint.route('/analyze', methods=['POST'])
@routes_blueprint.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    keyword = data.get("prompt", "").strip()

    # Log the received keyword
    print(f"Received keyword: {keyword}")

    if not keyword:
        return jsonify({"error": "No keyword provided"}), 400

    scraper = Scraper(keyword)
    results = scraper.generate_bias_summary()

    # Log the results to verify they are being returned correctly
    print(f"Generated Results: {results}")
    return jsonify(results)


# @routes_blueprint.route('/scrape', methods=['POST'])
# def scrape():
#     data = request.get_json()
#     keyword = data.get('keyword')
#     articles = perform_scraping(keyword)  # Function that uses Beautiful Soup
#     return jsonify({'articles': articles})
#
# @routes_blueprint.route('/translate_to_brainrot', methods=['POST'])
# def translate_to_brainrot():
#     data = request.get_json()
#     summary = data.get('summary')
#     brainrot_text = generate_brainrot_text(summary)  # Your custom logic
#     return jsonify({'brainrot_text': brainrot_text})
#
# @routes_blueprint.route('/generate_podcast', methods=['POST'])
# def generate_podcast():
#     data = request.get_json()
#     brainrot_text = data.get('brainrot_text')
#     audio_url = create_podcast_audio(brainrot_text)  # Your podcast generation logic
#     return jsonify({'audio_url': audio_url})


