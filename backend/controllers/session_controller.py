from backend.core.file_store import FileStore
from backend.core.session import Session

store = FileStore("backend/data/session")

class SessionController:
    @staticmethod
    def list_all():
        return [c.to_json() for c in store.list(Session)]

    @staticmethod
    def get_by_id(item_id):
        data = store.load(item_id)
        return Session.from_json(data).to_json() if data else None

    @staticmethod
    def create(data):
        creature = Session.from_json(data)
        store.save(creature)
        return creature.to_json()