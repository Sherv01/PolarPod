from app.scrape import Scraper

def test_scraping():
    keyword = "LA fires"
    scraper = Scraper(keyword)
    results = scraper.generate_bias_summary()
    assert 'right_summary' in results
    assert 'left_summary' in results
    assert len(results['right_summary']) > 0
    assert len(results['left_summary']) > 0
