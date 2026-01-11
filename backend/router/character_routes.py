from flask import Blueprint, request, jsonify
from backend.controllers.character_controller import CharacterController

character_bp = Blueprint("characters", __name__, url_prefix="/characters")

@character_bp.get("/")
def list_characters():
    return jsonify(CharacterController.list())

@character_bp.post("/")
def create_character():
    data = request.json
    return jsonify(CharacterController.create(data)), 201
