import uuid

class Character:
    def __init__(self, data: dict):
        self.id = data.get("id", str(uuid.uuid4()))
        self.infos = data.get("infos", {})
        self.atributos = data.get("atributos", {})
        self.pericias = data.get("pericias", {})
        self.status = data.get("status", {})
        self.poderes = data.get("poderes", [])
        self.inventario = data.get("inventario", [])
        self.rituais = data.get("rituais", [])
        self.dados = data.get("dados", [])

    # ---------- FACTORIES ----------

    @classmethod
    def from_json(cls, data: dict):
        return cls(data)

    # ---------- SERIALIZAÇÃO ----------

    def to_json(self):
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