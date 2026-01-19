from flask import Blueprint, request, jsonify
from backend.controllers.bestiary_controller import BestiaryController

bestiary_bp = Blueprint("bestiary", __name__, url_prefix="/bestiary")

@bestiary_bp.get("/")
def list_creatures():
    return jsonify(BestiaryController.list_all())

@bestiary_bp.get("/<id>")
def get_creature(id):
    creature = BestiaryController.get_by_id(id)
    return jsonify(creature) if creature else (jsonify({"error": "Não encontrado"}), 404)

@bestiary_bp.post("/")
def create_creature():
    return jsonify(BestiaryController.create(request.json)), 201