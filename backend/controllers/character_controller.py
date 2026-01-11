from backend.core.character import Character
from backend.core.file_store import FileStore

store = FileStore("backend/data/characters")

class CharacterController:

    @staticmethod
    def list():
        return [c.to_json() for c in store.list()]

    @staticmethod
    def create(data):
        character = Character.from_json(data)
        store.save(character)
        return character.to_json()
