from flask import Blueprint, request, jsonify
from backend.controllers.character_controller import CharacterController

# Definição do Blueprint para organizar as rotas relacionadas a personagens
character_bp = Blueprint("characters", __name__, url_prefix="/characters")

# Lista de seções permitidas para evitar acessos indevidos a chaves inexistentes
valid_parts = ["infos", "atributos", "pericias", "status"]
valid_lists = ["poderes", "inventario", "rituais", "dados"]

@character_bp.get("/")
def list_characters():
    """
    Lista todos os personagens com seus dados completos.
    
    Returns:
        JSON: Array de objetos Character completos.
    """
    # Note: CharacterController.list() deve retornar todos os personagens
    return jsonify(CharacterController.list())

@character_bp.get("/summary")
def list_summary():
    """
    Retorna uma lista simplificada de personagens para exibição em menus.
    
    Returns:
        JSON: Array de objetos contendo apenas {id, nome}.
    """
    return jsonify(CharacterController.list_summary())

@character_bp.get("/<id>")
def get_full_character(id):
    """
    Busca um personagem específico pelo ID.
    
    Args:
        id (str): UUID do personagem.
    Returns:
        JSON: Dados completos ou mensagem de erro 404.
    """
    char = CharacterController.get_by_id(id)
    if not char:
        return jsonify({"error": "Personagem não encontrado"}), 404
    return jsonify(char)

@character_bp.get("/<parte>/<id>")
def get_character_part(parte, id):
    """
    Recupera apenas uma seção específica de um personagem.
    
    Args:
        parte (str): Nome da seção (ex: 'inventario').
        id (str): UUID do personagem.
    Returns:
        JSON: Os dados da seção solicitada.
    """
    if parte not in valid_parts:
        return jsonify({"error": f"Parte '{parte}' inválida"}), 400
        
    data = CharacterController.get_part(id, parte)
    if data is None:
        return jsonify({"error": "Personagem não encontrado"}), 404
    return jsonify(data)

@character_bp.patch("/<parte>/<id>")
def update_character_part(parte, id):
    """
    Atualiza parcialmente um personagem, modificando apenas uma seção.
    
    Args:
        parte (str): Nome da seção a ser atualizada.
        id (str): UUID do personagem.
    Payload (JSON): Novos dados para aquela seção específica.
    Returns:
        JSON: O personagem completo atualizado.
    """
    if parte not in valid_parts and parte not in valid_lists:
        return jsonify({"error": f"Parte '{parte}' inválida"}), 400

    new_data = request.json
    if new_data is None:
        return jsonify({"error": "Corpo da requisição vazio"}), 400

    # Validação de tipo: se for lista, o dado enviado deve ser lista
    if parte in valid_lists and not isinstance(new_data, (list, dict)):
         return jsonify({"error": f"A parte '{parte}' espera uma lista ou objeto"}), 400

    updated = CharacterController.update_part(id, parte, new_data)
    if not updated:
        return jsonify({"error": "Personagem não encontrado"}), 404
    return jsonify(updated)

# Rota para ADICIONAR item em uma lista
@character_bp.post("/<lista>/<id>")
def add_item(lista, id):
    if lista not in valid_lists:
        return jsonify({"error": "Lista inválida"}), 400
        
    item_data = request.json
    result = CharacterController.add_to_list(id, lista, item_data)
    
    if not result:
        return jsonify({"error": "Personagem não encontrado ou parte não é uma lista"}), 404
        
    return jsonify(result), 201

# Rota para REMOVER item de uma lista
@character_bp.delete("/<lista>/<id>/<item_id>")
def remove_item(lista, id, item_id):
    if lista not in valid_lists:
        return jsonify({"error": "Lista inválida"}), 400
        
    result = CharacterController.remove_from_list(id, lista, item_id)
    
    if not result:
        return jsonify({"error": "Item ou Personagem não encontrado"}), 404
        
    return jsonify(result), 200

@character_bp.put("/<id>")
def update_character(id):
    """
    Atualiza o personagem completo via PUT.
    """
    data = request.json
    if not data:
        return jsonify({"error": "Dados não fornecidos"}), 400
        
    updated = CharacterController.update_full(id, data)
    if not updated:
        return jsonify({"error": "Personagem não encontrado"}), 404
        
    return jsonify(updated), 200

# Certifique-se que o seu POST existente está chamando o controller corretamente:
@character_bp.post("/")
def create_character():
    data = request.json
    if not data or "infos" not in data or "nome" not in data.get("infos", {}):
        return jsonify({"error": "O personagem precisa de um nome em 'infos'"}), 400
    
    # O controller.create já chama o _ensure_ids internamente
    created = CharacterController.create(data)
    return jsonify(created), 201