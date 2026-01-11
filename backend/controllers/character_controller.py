from typing import List, Dict, Any, Optional
from backend.core.character import Character
from backend.core.file_store import FileStore
import uuid

# Instância única do store para ser usada por todos os métodos do controller
store = FileStore("backend/data/characters")

class CharacterController:
    """
    Controlador responsável pela lógica de negócio e intermediação entre 
    as rotas da API e o armazenamento de arquivos.
    """

    @staticmethod
    def _ensure_ids(data: dict):
        """
        Percorre as listas definidas em valid_lists e garante que todos 
        os itens possuam um ID único.
        """
        valid_lists = ["poderes", "inventario", "rituais", "dados"]
        for lista_nome in valid_lists:
            itens = data.get(lista_nome, [])
            if isinstance(itens, list):
                for item in itens:
                    if isinstance(item, dict) and "id" not in item:
                        item["id"] = str(uuid.uuid4())
        return data
    
    @staticmethod
    def list_summary() -> List[Dict[str, str]]:
        """
        Gera uma lista otimizada com informações básicas de todos os personagens.
        Ideal para preencher listas de seleção no frontend sem carregar dados pesados.

        Returns:
            List[Dict]: Lista de dicionários contendo apenas 'id' e 'nome'.
        """
        chars = store.list()
        return [{"id": c.id, "nome": c.infos.get("nome", "Sem Nome")} for c in chars]

    @staticmethod
    def get_by_id(char_id: str) -> Optional[Dict[str, Any]]:
        """
        Recupera a ficha completa de um personagem através do seu ID.

        Args:
            char_id (str): UUID do personagem.

        Returns:
            Optional[Dict]: Dicionário completo do personagem ou None se não encontrado.
        """
        data = store.load(char_id)
        if data:
            return Character.from_json(data).to_json()
        return None

    @staticmethod
    def get_part(char_id: str, part_name: str) -> Optional[Any]:
        """
        Acessa uma seção específica da ficha (ex: apenas o inventário).

        Args:
            char_id (str): UUID do personagem.
            part_name (str): Nome da chave desejada (ex: 'atributos', 'status').

        Returns:
            Optional[Any]: O conteúdo da parte solicitada ou None se o personagem não existir.
        """
        data = store.load(char_id)
        if not data:
            return None
        # Retorna a parte específica ou um valor padrão (dicionário ou lista) 
        # dependendo de como foi definido no Character
        return data.get(part_name)

    @staticmethod
    def update_part(char_id: str, part_name: str, part_data: Any) -> Optional[Dict[str, Any]]:
        """
        Atualiza uma seção da ficha realizando um merge se for um dicionário.
        Isso evita que dados existentes sejam apagados ao atualizar apenas um campo.
        """
        data = store.load(char_id)
        if not data:
            return None
        
        # Se estivermos atualizando uma lista inteira via PATCH
        if part_name in ["poderes", "inventario", "rituais", "dados"] and isinstance(part_data, list):
            for item in part_data:
                if isinstance(item, dict) and "id" not in item:
                    item["id"] = str(uuid.uuid4())
            data[part_name] = part_data
        
        # Se for dicionário (status, atributos...), faz o merge que já tínhamos
        elif isinstance(data.get(part_name), dict) and isinstance(part_data, dict):
            data[part_name].update(part_data)
        else:
            data[part_name] = part_data
        
        character = Character.from_json(data)
        store.save(character)
        return character.to_json()

    @staticmethod
    def create(data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Cria um novo personagem a partir de dados fornecidos e o persiste.

        Args:
            data (Dict): Dados iniciais do personagem.

        Returns:
            Dict: O JSON do personagem criado (incluindo o ID gerado automaticamente).
        """
        data = CharacterController._ensure_ids(data)
        character = Character.from_json(data)
        store.save(character)
        return character.to_json()

    @staticmethod
    def add_to_list(char_id: str, part_name: str, item_data: dict):
        data = store.load(char_id)
        if not data or not isinstance(data.get(part_name), list):
            return None
        
        # Indexação garantida aqui também
        if "id" not in item_data:
            item_data["id"] = str(uuid.uuid4())
            
        data[part_name].append(item_data)
        
        character = Character.from_json(data)
        store.save(character)
        return item_data

    @staticmethod
    def remove_from_list(char_id: str, part_name: str, item_id: str):
        data = store.load(char_id)
        if not data or not isinstance(data.get(part_name), list):
            return None
        
        # Filtra a lista mantendo apenas itens que NÃO têm o ID informado
        original_length = len(data[part_name])
        data[part_name] = [item for item in data[part_name] if item.get("id") != item_id]
        
        if len(data[part_name]) == original_length:
            return None # Nenhum item foi removido
            
        character = Character.from_json(data)
        store.save(character)
        return {"success": True, "removed_id": item_id}