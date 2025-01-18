from flask import Flask, render_template
from app.routes import routes_blueprint  # Import your blueprint

app = Flask(__name__, template_folder='templates')
app.config['SECRET_KEY'] = '665a6114d93f38d96c5e82b4306b3eea'

# Register the blueprint
app.register_blueprint(routes_blueprint)

from app import routes  # Ensure routes are loaded