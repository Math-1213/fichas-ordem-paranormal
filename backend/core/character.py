import uuid
from typing import Any, Dict, List

class Character:
    """
    Representa a entidade principal de um personagem no sistema de ficha.
    
    Esta classe atua como um Data Transfer Object (DTO) e modelo de domínio,
    facilitando a conversão entre dados brutos (JSON/Dicionários) e objetos Python.
    """

    def __init__(self, data: Dict[str, Any]):
        """
        Inicializa um personagem com dados fornecidos.

        Args:
            data (dict): Dicionário contendo as informações do personagem.
                As chaves esperadas incluem 'infos', 'atributos', 'pericias', etc.
                Se 'id' não for fornecido, um novo UUID v4 será gerado.
        """
        # Identificador único (UUID) para evitar colisão de arquivos
        self.id: str = data.get("id", str(uuid.uuid4()))
        
        # Informações biográficas (Nome, idade, classe, trilha, etc.)
        self.infos: Dict[str, Any] = data.get("infos", {})
        
        # Atributos básicos (Força, Agilidade, Intelecto, etc.)
        self.atributos: Dict[str, int] = data.get("atributos", {})
        
        # Lista de perícias e seus respectivos bônus/treinamentos
        self.pericias: Dict[str, Any] = data.get("pericias", {})
        
        # Valores mutáveis (PV, PE, Sanidade, Defesa, etc.)
        self.status: Dict[str, Any] = data.get("status", {})
        
        # Habilidades especiais e poderes adquiridos
        self.poderes: List[Dict[str, Any]] = data.get("poderes", [])
        
        # Itens, armas e equipamentos carregados
        self.inventario: List[Dict[str, Any]] = data.get("inventario", [])
        
        # Magias ou rituais conhecidos
        self.rituais: List[Dict[str, Any]] = data.get("rituais", [])
        
        # Configurações de rolagem de dados personalizadas
        self.dados: List[Dict[str, Any]] = data.get("dados", [])

    # ---------- FACTORIES ----------

    @classmethod
    def from_json(cls, data: Dict[str, Any]) -> 'Character':
        """
        Método de fábrica para criar uma instância de Character a partir de um JSON.
        
        Args:
            data (dict): O dicionário vindo do arquivo ou da requisição API.
            
        Returns:
            Character: Uma nova instância da classe.
        """
        return cls(data)

    # ---------- SERIALIZAÇÃO ----------

    def to_json(self) -> Dict[str, Any]:
        """
        Converte a instância atual em um dicionário serializável para JSON.
        
        Returns:
            dict: Representação completa do personagem para persistência ou envio via API.
        """
        return {
            "id": self.id,
            "infos": self.infos,
            "atributos": self.atributos,
            "pericias": self.pericias,
            "status": self.status,
            "poderes": self.poderes,
            "inventario": self.inventario,
            "rituais": self.rituais,
            "dados": self.dados
        }