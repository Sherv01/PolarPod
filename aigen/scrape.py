import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("API_KEY"))
# Define lists of websites to scrape
RIGHT_WING_SITES = [
    "https://www.foxnews.com/search-results/search?q=placeholder",
    "https://www.westernjournal.com/?s=placeholder",
    "https://www.theepochtimes.com/search?origin=et&d=et&q=placeholder",
]

LEFT_WING_SITES = [
    "https://www.cnn.com/search?q=placeholder&from=0&size=10&page=1&sort=newest&types=all&section=",
    "https://www.npr.org/search/?query=placeholder&page=1",
    "https://apnews.com/search?q=placeholder#nt=navsearch",
]


def extract_text(url):
    """Extract full text from an article URL."""
    try:
        response = requests.get(url, headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8'})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        paragraphs = soup.find_all("p")
        return " ".join(p.get_text() for p in paragraphs if p.get_text()).strip()
    except Exception as e:
        print(f"Error extracting text from {url}: {e}")
        return ""


def summarize_text_with_genai(article_text):
    """Summarize text using Google Generative AI."""
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(
            f"Summarize the following article:\n\n{article_text}",
        )
        summary = response.text
        return summary.strip()
    except Exception as e:
        print(f"Error using Generative AI for summarization: {e}")
        return None


class Scraper:
    def __init__(self, keyword):
        self.keyword = keyword
        RIGHT_WING_SITES[0] = RIGHT_WING_SITES[0].replace("placeholder", keyword)
        RIGHT_WING_SITES[1] = RIGHT_WING_SITES[1].replace("placeholder", keyword)
        RIGHT_WING_SITES[2] = RIGHT_WING_SITES[2].replace("placeholder", keyword)
        LEFT_WING_SITES[0] = LEFT_WING_SITES[0].replace("placeholder", keyword)
        LEFT_WING_SITES[1] = LEFT_WING_SITES[1].replace("placeholder", keyword)
        LEFT_WING_SITES[2] = LEFT_WING_SITES[2].replace("placeholder", keyword)

    def scrape_articles(self, site, max_articles=3):
        """Scrape articles from a single site for the given keyword."""
        try:
            response = requests.get(site, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")

            # Extract links to articles (usually from headlines)
            articles = []
            for link in soup.find_all("a", href=True):
                link_text = link.get_text().strip()
                temp = (self.keyword.lower()).split()
                first = len((set(link_text.split()).intersection(set(temp)))) > 0
                second = (self.keyword.lower() in link_text.lower())
                if first or second:
                    article_url = link["href"]
                    # Make sure the URL is complete
                    if not article_url.startswith("http"):
                        article_url = requests.compat.urljoin(site, article_url)
                    articles.append({"title": link_text, "url": article_url})
                    if len(articles) >= max_articles:  # Limit to max_articles
                        break

            print(f"Found {len(articles)} articles at {site}")
            return articles
        except Exception as e:
            print(f"Error scraping {site}: {e}")
            return []

    def process_perspective(self, sites):
        """Process a list of sites for a given perspective."""
        summaries = []
        for site in sites:
            articles = self.scrape_articles(site)
            for article in articles:
                print(f"Scraping article: {article['title']} ({article['url']})")
                full_text = extract_text(article["url"])
                if full_text:
                    summary = summarize_text_with_genai(full_text)
                    if summary:
                        summaries.append(summary)
        return " ".join(summaries)

    def generate_bias_summary(self):
        """Generate summaries for right-wing and left-wing perspectives."""
        print("Processing right-wing sources...")
        right_summary = self.process_perspective(RIGHT_WING_SITES)

        print("Processing left-wing sources...")
        left_summary = self.process_perspective(LEFT_WING_SITES)

        return {"right_wing": right_summary, "left_wing": left_summary}
