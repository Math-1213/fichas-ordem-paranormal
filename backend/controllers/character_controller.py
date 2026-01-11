from typing import List, Dict, Any, Optional
from backend.core.character import Character
from backend.core.file_store import FileStore

# Instância única do store para ser usada por todos os métodos do controller
store = FileStore("backend/data/characters")

class CharacterController:
    """
    Controlador responsável pela lógica de negócio e intermediação entre 
    as rotas da API e o armazenamento de arquivos.
    """

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
        Atualiza apenas uma seção da ficha, preservando o restante dos dados.
        Este método lê o arquivo, modifica a parte em memória e sobrescreve o arquivo.

        Args:
            char_id (str): UUID do personagem.
            part_name (str): A seção a ser atualizada.
            part_data (Any): Os novos dados para aquela seção.

        Returns:
            Optional[Dict]: O JSON completo do personagem atualizado ou None.
        """
        data = store.load(char_id)
        if not data:
            return None
        
        # Atualiza apenas a parte solicitada no dicionário em memória
        data[part_name] = part_data
        
        # Reconstrói o objeto para validar a estrutura e salva através do store
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
        character = Character.from_json(data)
        store.save(character)
        return character.to_json()