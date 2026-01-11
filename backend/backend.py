from flask import Flask
from backend.router.character_routes import character_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(character_bp)
    return app
