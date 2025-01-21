from bs4 import BeautifulSoup
from flask import Blueprint, request, jsonify, render_template
from app.scrape import Scraper
from app.genresponses import generate_news
import requests
from app.genresponses import text_to_wav
# Define the blueprint
routes_blueprint = Blueprint('routes', __name__)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8'
}

# Define the home route within the blueprint

# Define the analysis route
@routes_blueprint.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    keyword = data.get("search", "").strip()

    # Log the received keyword
    print(f"Received keyword: {keyword}")

    if not keyword:
        return jsonify({"error": "No keyword provided"}), 400

    # Step 1: Scrape articles and generate bias summary
    scraper = Scraper(keyword)
    bias_summary = scraper.generate_bias_summary()

    # Log the bias summary
    print(f"Bias Summary: {bias_summary}")

    # Step 2: Pass the summary to genresponses.py for further processing
    try:
        response = generate_news(bias_summary)
    except Exception as e:
        print(f"Error generating news response: {e}")
        return jsonify({"error": "Failed to generate response"}), 500

    # Log the response for debugging
    print(f"Generated Response: {response}")

    text_to_wav("en-US-Wavenet-C", response)

    # Step 3: Return the enhanced response
    return jsonify({
        "right_summary": bias_summary.get("right_wing"),
        "left_summary": bias_summary.get("left_wing"),
        "similarities": response.get("center", []),
        "perspective1": response.get("right", []),
        "perspective2": response.get("left", []),
    })
@routes_blueprint.route('/items', methods=['GET'])
def get_items():
    """API Endpoint to get the list of articles"""
    search_url = 'https://www.bbc.com/'  # Replace with your desired URL
    data = get_article_info(search_url)
    return jsonify(data)  # Return the article data as JSON

def get_article_info(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print(f'Error getting to webpage: {url}')
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    articles = soup.find_all('div', {'data-testid': 'edinburgh-article'})
    article_data = []



    for article in articles:
        # Extract image URL (excluding placeholder images)
        specific_url = "/bbcx/grey-placeholder.png"
        image = article.find('img', src=lambda x: x and x != specific_url)
        image_url = image['src'] if image else 'No image found'

        # Extract title
        title = article.find('h2', {'data-testid': 'card-headline'})
        title_text = title.text.strip() if title else 'No title found'

        # Add the extracted data
        article_data.append({
            "title": title_text,
            "image_url": image_url
        })

    return article_data

