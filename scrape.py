import requests
from bs4 import BeautifulSoup

RIGHT_WING_SITES = [
    "https://www.foxnews.com/search-results/search?q=LA+fires",
    "https://www.westernjournal.com/?s=LA+Fires",
    "https://www.theepochtimes.com/search?origin=et&d=et&q=LA+Fires",
]

LEFT_WING_SITES = [
    "https://www.cnn.com/",
    "https://www.npr.org/",
    "https://www.msnbc.com/",
]

GEMINI_API_URL = "https://gemini.googleapis.com/v1/summarize"
GEMINI_API_KEY = "AIzaSyA4O0XNwG6kDg8PE-0o-BY7qya1kAqX6kc"  # Replace with your actual Gemini API key


def extract_text(url):
    """Extract full text from an article URL."""
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        paragraphs = soup.find_all("p")
        return " ".join(p.get_text() for p in paragraphs if p.get_text()).strip()
    except Exception as e:
        print(f"Error extracting text from {url}: {e}")
        return ""


class Scraper:
    def __init__(self, keyword):
        self.keyword = keyword
        self.headers = {"Authorization": f"Bearer {GEMINI_API_KEY}", "Content-Type": "application/json"}

    def scrape_articles(self, site, max_articles=3):
        """Scrape articles from a single site for the given keyword."""
        try:
            response = requests.get(site, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")

            # Extract links
            articles = []
            for link in soup.find_all("a", href=True):
                # Log each article link and the comparison with the keyword
                print(f"Link text: {link.text} | Matching with keyword: {self.keyword.lower() in link.text.lower()}")
                if self.keyword.lower() in link.text.lower() and len(articles) < max_articles:
                    articles.append({"title": link.text,
                                     "url": link["href"] if link["href"].startswith("http") else site + link["href"]})

            print(f"Found {len(articles)} articles at {site}")
            return articles
        except Exception as e:
            print(f"Error scraping {site}: {e}")
            return []

    def summarize_text(self, text):
        """Summarize text using the Gemini API."""
        try:
            payload = {
                "model": "gemini-1.5-pro-latest",
                "messages": [
                    {"role": "system", "content": "You are a journalist creating detailed, fact-rich summaries."},
                    {"role": "user", "content": f"Summarize the following text:\n\n{text}\n\nSummary:"},
                ],
                "max_tokens": 500,
            }
            response = requests.post(GEMINI_API_URL, headers=self.headers, json=payload)
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"].strip()
        except Exception as e:
            print(f"Error summarizing text: {e}")
            return ""

    def process_perspective(self, sites):
        """Process a list of sites for a given perspective."""
        summaries = []
        for site in sites:
            articles = self.scrape_articles(site)
            for article in articles:
                full_text = extract_text(article["url"])
                if full_text:
                    summary = self.summarize_text(full_text)
                    if summary:
                        summaries.append(summary)
        return " ".join(summaries)

    def generate_bias_summary(self):
        """Generate summaries for right-wing and left-wing perspectives."""
        right_summary = self.process_perspective(RIGHT_WING_SITES)
        left_summary = self.process_perspective(LEFT_WING_SITES)
        return {"right_wing": right_summary, "left_wing": left_summary}