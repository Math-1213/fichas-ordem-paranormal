import uuid
import re
from typing import Any, Dict, List, Optional
import unicodedata

def slugify_name(name_input: str) -> str:
    # 1. Normaliza para decompor caracteres (Ex: 'ã' vira 'a' + '~')
    # O modo NFKD separa o caractere da sua acentuação
    normalized = unicodedata.normalize('NFKD', name_input)
    
    # 2. Converte para ASCII, ignorando os erros (remove os acentos que sobraram)
    ascii_text = normalized.encode('ascii', 'ignore').decode('ascii')
    
    # 3. Remove qualquer caractere que não seja letra, número ou espaço
    clean_text = re.sub(r'[^a-zA-Z0-9\s]', '', ascii_text)
    
    # 4. Transforma em snake_case (lowercase, strip e troca espaço por _)
    return clean_text.strip().replace(" ", "_").lower()

class Creature:
    def __init__(self, data: Dict[str, Any]):
        name_input = data.get("name", "criatura_desconhecida")
        generated_id = slugify_name(name_input)
        # Campos Básicos
        
        self.id: str = generated_id if generated_id else str(uuid.uuid4())
        self.name: str = data.get("name", "Criatura Desconhecida")
        self.element: str = data.get("element", "Medo")
        self.secondary_elements: List[str] = data.get("secondaryElements", [])
        self.description: str = data.get("description", "")
        self.image: str = data.get("image", "")
        
        # Informações de Combate e Sistema
        self.vd: str = data.get("vd", "0")
        self.size: str = data.get("size", "médio")
        self.displacement: str = data.get("displacement", "9m")
        self.enigma: str = data.get("enigma", "")
        
        # Atributos (FOR, AGI, etc)
        self.attributes: Dict[str, int] = data.get("attributes", {
            "FOR": 0, "AGI": 0, "INT": 0, "PRE": 0, "VIG": 0
        })
        
        # Status (PV, Defesa, etc)
        self.stats: Dict[str, Any] = data.get("stats", {"pv": 0, "defesa": 0})
        
        # Presença Perturbadora
        self.presence: Dict[str, str] = data.get("presence", {"dt": "", "immune": "", "damage": ""})
        
        # Perícias (Skills)
        self.skills: Dict[str, Dict[str, Any]] = data.get("skills", {})
        
        # Ações e Habilidades
        self.actions: List[Dict[str, Any]] = data.get("actions", [])
        self.abilities: List[Dict[str, Any]] = data.get("abilities", [])
        
        # Defesas Passivas
        self.resistances: List[str] = data.get("resistances", [])
        self.vulnerabilities: List[str] = data.get("vulnerabilities", [])
        self.immunities: List[str] = data.get("immunities", [])
        
        # Metadados
        self.updated_at: str = data.get("updatedAt", "")

    @classmethod
    def from_json(cls, data: Dict[str, Any]) -> 'Creature':
        return cls(data)

    def to_json(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "element": self.element,
            "secondaryElements": self.secondary_elements,
            "description": self.description,
            "vd": self.vd,
            "size": self.size,
            "displacement": self.displacement,
            "stats": self.stats,
            "attributes": self.attributes,
            "presence": self.presence,
            "skills": self.skills,
            "actions": self.actions,
            "abilities": self.abilities,
            "resistances": self.resistances,
            "vulnerabilities": self.vulnerabilities,
            "immunities": self.immunities,
            "image": self.image,
            "enigma": self.enigma,
            "updatedAt": self.updated_at
        }