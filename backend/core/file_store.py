import json
from pathlib import Path
from threading import Lock
from typing import List, Optional, Dict, Any, Type

class FileStore:
    def __init__(self, base_path: str, model_class: Type = None):
        """
        Args:
            base_path (str): Caminho onde os JSONs serão salvos.
            model_class (Type): A classe (Character ou Creature) que o store deve instanciar.
        """
        self.base_path = Path(base_path)
        self.base_path.mkdir(parents=True, exist_ok=True)
        self.locks: Dict[str, Lock] = {}
        self.model_class = model_class # Armazena a classe de modelo

    def _file(self, id: str) -> Path:
        return self.base_path / f"{id}.json"

    def save(self, obj) -> None:
        # Agora aceita qualquer objeto que tenha .id e .to_json()
        lock = self.locks.setdefault(obj.id, Lock())
        with lock:
            conteudo = json.dumps(obj.to_json(), indent=2, ensure_ascii=False)
            self._file(obj.id).write_text(conteudo, encoding="utf-8")

    def load(self, id: str) -> Optional[dict]:
        file = self._file(id)
        if not file.exists():
            return None
        return json.loads(file.read_text(encoding="utf-8"))

    def list(self) -> List:
        """
        Varre o diretório e carrega os objetos usando a classe definida no init.
        """
        items = []
        for file in self.base_path.glob("*.json"):
            try:
                dados = json.loads(file.read_text(encoding="utf-8"))
                # Se uma classe de modelo foi definida, instancia ela. 
                # Se não, retorna o dicionário bruto.
                if self.model_class:
                    items.append(self.model_class(dados))
                else:
                    items.append(dados)
            except (json.JSONDecodeError, IOError, Exception) as e:
                print(f"Erro ao carregar arquivo {file}: {e}")
        return items

    def delete(self, id: str) -> bool:
        file = self._file(id)
        if file.exists():
            file.unlink()
            self.locks.pop(id, None)
            return True
        return False

    def exists(self, id: str) -> bool:
        return self._file(id).exists()