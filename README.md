# Bias Buster

Media bias is a persistent issue – when every source gives you a different perspective, how do you know which one to believe?
We created Bias Buster to help you responsibly consume news media by identifying and separating left and right wing biases. We collect the latest articles from various sources and provide bullet-point summaries of left, right and center viewpoints.

In today's overstimulated, short-form content driven world, our attention spans are constantly under attack. We know, we've been there too. So we've added a brainrot generator, a tool that lets you keep up with current news while catering to your short attention span.

## Features

- Scrapes news articles from multiple sources
- Displays headlines, summaries, and links to full articles
- Supports filtering by category and date
- 

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/newsscraper.git
    ```
2. Navigate to the project directory:
    ```bash
    cd newsscraper
    ```
3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

1. Run the scraper:
    ```bash
    python scraper.py
    ```
2. Access the web interface at `http://localhost:5000` to view the scraped news articles.

## 🧩 Tech used

We have a *React JS* frontend to create our web app paired with a *Python Flask* backend. We use *Terraform* to create and manage *AWS* resources (creating S3 buckets, defining IAM roles and policies, deploying the Lambda function, and configuring API Gateway).
We use Google's *Gemini* API to summarize, separate and brainrot-ify news articles, and *Google Cloud Text-to-Speech* API to convert it to podcast form.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
