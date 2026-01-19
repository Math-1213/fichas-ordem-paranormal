from flask import Blueprint, request, jsonify
from backend.controllers.session_controller import SessionController

session_bp = Blueprint("session", __name__, url_prefix="/session")

@session_bp.get("/")
def list_creatures():
    return jsonify(SessionController.list_all())

@session_bp.get("/<id>")
def get_creature(id):
    creature = SessionController.get_by_id(id)
    return jsonify(creature) if creature else (jsonify({"error": "Não encontrado"}), 404)

@session_bp.post("/")
def create_creature():
    return jsonify(SessionController.create(request.json)), 201