import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8'
}
visited_urls = set()

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

@app.route('/items', methods=['GET'])
def get_items():
    """API Endpoint to get the list of articles"""
    search_url = 'https://www.bbc.com'  # Replace with your desired URL
    data = get_article_info(search_url)
    return jsonify(data)  # Return the article data as JSON

if __name__ == '__main__':
    app.run(debug=True)
