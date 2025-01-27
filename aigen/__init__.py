from flask import Flask, render_template
from app.routes import routes_blueprint  # Import your blueprint
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__, template_folder='templates')
app.config['SECRET_KEY'] = api_key=os.getenv("API_KEY")

# Register the blueprint
app.register_blueprint(routes_blueprint)

from app import routes  # Ensure routes are loaded