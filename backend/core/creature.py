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
        self.type: str = data.get("type", "criatura")
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
            "type": self.type,
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
    
    def merge(self, new_data: Dict[str, Any]):
        """
        Realiza o merge profundo de todos os campos da criatura.
        """
        # Campos Simples (Strings e Números)
        if "name" in new_data: 
            self.name = new_data["name"]
            # Opcional: Se quiser que o ID mude se o nome mudar:
            # self.id = slugify_name(self.name)
            
        if "element" in new_data: self.element = new_data["element"]
        if "description" in new_data: self.description = new_data["description"]
        if "vd" in new_data: self.vd = str(new_data["vd"])
        if "size" in new_data: self.size = new_data["size"]
        if "type" in new_data: self.type = new_data["type"]
        if "displacement" in new_data: self.displacement = new_data["displacement"]
        if "image" in new_data: self.image = new_data["image"]
        if "enigma" in new_data: self.enigma = new_data["enigma"]

        # Listas de Strings (Substituição Simples)
        if "secondaryElements" in new_data: self.secondary_elements = new_data["secondaryElements"]
        if "resistances" in new_data: self.resistances = new_data["resistances"]
        if "vulnerabilities" in new_data: self.vulnerabilities = new_data["vulnerabilities"]
        if "immunities" in new_data: self.immunities = new_data["immunities"]

        # Dicionários de Nível Único (Merge com update)
        if "stats" in new_data and isinstance(new_data["stats"], dict):
            self.stats.update(new_data["stats"])
        
        if "attributes" in new_data and isinstance(new_data["attributes"], dict):
            self.attributes.update(new_data["attributes"])
            
        if "presence" in new_data and isinstance(new_data["presence"], dict):
            self.presence.update(new_data["presence"])

        # Dicionários Complexos ou Listas de Objetos (Substituição)
        # Para Perícias (skills), Ações (actions) e Habilidades (abilities), 
        # o front geralmente envia o estado completo da lista após a edição.
        if "skills" in new_data: self.skills = new_data["skills"]
        if "actions" in new_data: self.actions = new_data["actions"]
        if "abilities" in new_data: self.abilities = new_data["abilities"]

        # Metadados
        from datetime import datetime
        self.updated_at = datetime.now().isoformat()