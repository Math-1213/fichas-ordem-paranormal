
import json
from pathlib import Path
from threading import Lock

class FileStore:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.base_path.mkdir(parents=True, exist_ok=True)
        self.locks = {}

    def _file(self, id):
        return self.base_path / f"{id}.json"

    def save(self, character):
        lock = self.locks.setdefault(character.id, Lock())
        with lock:
            self._file(character.id).write_text(
                json.dumps(character.to_json(), indent=2, ensure_ascii=False),
                encoding="utf-8"
            )

    def load(self, id):
        file = self._file(id)
        if not file.exists():
            return None
        return json.loads(file.read_text(encoding="utf-8"))

    def list(self):
        from backend.core.character import Character
        chars = []
        for file in self.base_path.glob("*.json"):
            chars.append(
                Character.from_json(
                    json.loads(file.read_text(encoding="utf-8"))
                )
            )
        return chars
