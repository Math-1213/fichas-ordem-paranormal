from backend.core.file_store import FileStore
from backend.core.creature import Creature

store = FileStore("backend/data/bestiary")

class BestiaryController:
    @staticmethod
    def list_all():
        return [c.to_json() for c in store.list(Creature)]

    @staticmethod
    def get_by_id(item_id):
        data = store.load(item_id)
        return Creature.from_json(data).to_json() if data else None

    @staticmethod
    def create(data):
        creature = Creature.from_json(data)
        store.save(creature)
        return creature.to_json()