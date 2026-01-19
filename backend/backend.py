from flask import Flask
from flask_cors import CORS
from backend.router.character_routes import character_bp
from backend.router.music_routes import music_bp
from backend.router.bestiary_routes import bestiary_bp
from backend.router.session_routes import session_bp

def create_app() -> Flask:
    """
    Cria e configura a instância do aplicativo Flask.
    
    Este padrão (Application Factory) permite criar múltiplas instâncias
    do app para testes ou diferentes configurações de forma isolada.

    Returns:
        Flask: O objeto da aplicação configurado com os Blueprints.
    """
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Registro de rotas através de Blueprints
    app.register_blueprint(character_bp)
    app.register_blueprint(music_bp)
    app.register_blueprint(bestiary_bp)
    app.register_blueprint(session_bp)

    return app