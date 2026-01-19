import uuid
from typing import Any, Dict, List

class Creature:
    def __init__(self, data: Dict[str, Any]):
        self.id: str = data.get("id", str(uuid.uuid4()))
        self.name: str = data.get("name", "Criatura Desconhecida")
        self.element: str = data.get("element", "Medo") # Sangue, Morte, etc.
        self.description: str = data.get("description", "")
        self.stats: Dict[str, Any] = data.get("stats", {}) # VD, PV, Defesa...
        self.abilities: List[Dict[str, Any]] = data.get("abilities", [])
        self.image: str = data.get("image", "")

    @classmethod
    def from_json(cls, data: Dict[str, Any]) -> 'Creature':
        return cls(data)

    def to_json(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "element": self.element,
            "description": self.description,
            "stats": self.stats,
            "abilities": self.abilities,
            "image": self.image
        }