from backend.core.file_store import FileStore
from backend.core.creature import Creature

store = FileStore("backend/data/bestiary", model_class=Creature)

class BestiaryController:
    @staticmethod
    def list_all():
        """
        Retorna um resumo otimizado das criaturas para os Cards de seleção da vitrine.
        """
        creatures = store.list()
        print(creatures)
        return [{
            "id": c.id,
            "name": c.name,
            "element": c.element,
            "secondaryElements": c.secondary_elements,
            "vd": c.vd,
            "size": c.size,
            "image": c.image,
            "pv": c.stats.get("pv", 0),
            "defesa": c.stats.get("defesa", 0),
            "attributes": c.attributes,
            "updatedAt": c.updated_at
        } for c in creatures]

    @staticmethod
    def get_by_id(item_id):
        data = store.load(item_id)
        return Creature.from_json(data).to_json() if data else None

    @staticmethod
    def create(data):
        creature = Creature.from_json(data)
        store.save(creature)
        return creature.to_json()
    
    @staticmethod
    def update_merge(item_id, new_data):
        # 1. Tenta carregar os dados atuais
        existing_data = store.load(item_id)
        if not existing_data:
            return None

        # 2. Converte os dados atuais para o modelo Creature
        creature = Creature.from_json(existing_data)
        
        # 3. Faz o merge dos dados (Lógica implementada no próximo passo)
        creature.merge(new_data)
        
        # 4. Salva de volta na Store
        store.save(creature)
        
        return creature.to_json()