import uuid
from typing import Any, Dict, List

class Session:
    def __init__(self, data: Dict[str, Any]):
        self.id: str = data.get("id", str(uuid.uuid4()))
        self.title: str = data.get("title", "Nova Operação")
        self.date: str = data.get("date", "")
        self.summary: str = data.get("summary", "")
        self.active_agents: List[str] = data.get("active_agents", []) # Lista de IDs de personagens
        self.logs: List[Dict[str, Any]] = data.get("logs", []) # Histórico da sessão

    @classmethod
    def from_json(cls, data: Dict[str, Any]) -> 'Session':
        return cls(data)

    def to_json(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date,
            "summary": self.summary,
            "active_agents": self.active_agents,
            "logs": self.logs
        }