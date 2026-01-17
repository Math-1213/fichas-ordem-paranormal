import json
from pathlib import Path
from threading import Lock
from typing import List, Optional, Dict

class FileStore:
    """
    Gerencia o armazenamento persistente de personagens em arquivos JSON locais.
    
    Esta classe utiliza o sistema de arquivos para salvar os dados e implementa
    Thread Safety (segurança de fios) através de Locks por arquivo, garantindo
    integridade em ambientes com múltiplas requisições simultâneas.
    """

    def __init__(self, base_path: str):
        """
        Inicializa o diretório de armazenamento.

        Args:
            base_path (str): Caminho relativo ou absoluto onde os JSONs serão salvos.
        """
        self.base_path = Path(base_path)
        # Cria o diretório se não existir (equivalente a mkdir -p)
        self.base_path.mkdir(parents=True, exist_ok=True)
        # Dicionário de Locks: cada ID de personagem tem seu próprio semáforo
        self.locks: Dict[str, Lock] = {}

    def _file(self, id: str) -> Path:
        """
        Gera o caminho do arquivo para um ID específico.

        Args:
            id (str): UUID do personagem.
            
        Returns:
            Path: Objeto Path apontando para o arquivo .json correspondente.
        """
        return self.base_path / f"{id}.json"

    def save(self, character) -> None:
        """
        Salva ou atualiza um personagem no disco.
        Utiliza Thread Lock para garantir que a escrita seja atômica por arquivo.

        Args:
            character (Character): Instância do personagem a ser persistida.
        """
        # Pega o lock existente ou cria um novo para este ID
        lock = self.locks.setdefault(character.id, Lock())
        with lock:
            conteudo = json.dumps(character.to_json(), indent=2, ensure_ascii=False)
            self._file(character.id).write_text(conteudo, encoding="utf-8")

    def load(self, id: str) -> Optional[dict]:
        """
        Lê os dados brutos de um personagem do disco.

        Args:
            id (str): UUID do personagem.

        Returns:
            Optional[dict]: Dados do personagem ou None se o arquivo não existir.
        """
        file = self._file(id)
        if not file.exists():
            return None
        return json.loads(file.read_text(encoding="utf-8"))

    def list(self) -> List:
        """
        Varre o diretório e carrega todos os personagens encontrados.

        Returns:
            List[Character]: Uma lista de instâncias da classe Character.
        """
        from backend.core.character import Character
        chars = []
        # Itera sobre todos os arquivos que terminam em .json na pasta base
        for file in self.base_path.glob("*.json"):
            try:
                dados = json.loads(file.read_text(encoding="utf-8"))
                chars.append(Character.from_json(dados))
            except (json.JSONDecodeError, IOError) as e:
                print(f"Erro ao carregar arquivo {file}: {e}")
        return chars

    def delete(self, id: str) -> bool:
        """
        Remove o arquivo de um personagem do sistema de arquivos.

        Args:
            id (str): UUID do personagem a ser removido.
            
        Returns:
            bool: True se deletado com sucesso, False se o arquivo não existia.
        """
        file = self._file(id)
        if file.exists():
            file.unlink() # Remove o arquivo fisicamente
            # Remove o lock da memória se ele existir
            self.locks.pop(id, None)
            return True
        return False

    def exists(self, id: str) -> bool:
        """
        Verifica se o arquivo de um personagem já existe no disco.

        Args:
            id (str): ID/Nome do arquivo a verificar.

        Returns:
            bool: True se o arquivo existir, False caso contrário.
        """
        return self._file(id).exists()