import os

class MusicController:
    # Estado em memória para sincronização rápida
    _current_track = {
        "url": None,
        "title": None
    }
    
    # Define o caminho base partindo da raiz do projeto (backend/data/musics)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MUSIC_DIR = os.path.join(BASE_DIR, "data", "musics")

    @classmethod
    def get_current(cls):
        return cls._current_track

    @classmethod
    def update_track(cls, data):
        # O mestre envia o nome do arquivo, e nós montamos a URL de stream
        filename = data.get("filename")
        if not filename:
            return cls.stop()

        cls._current_track["url"] = f"http://localhost:5001/music/stream/{filename}"
        cls._current_track["title"] = filename.replace(".mp3", "").replace("_", " ")
        return cls._current_track

    @classmethod
    def stop(cls):
        cls._current_track = {"url": None, "title": None}
        return cls._current_track

    @classmethod
    def list_available_files(cls):
        """Lista arquivos na pasta backend/data/musics"""
        if not os.path.exists(cls.MUSIC_DIR):
            # Cria a pasta caso ela não exista para evitar erros
            os.makedirs(cls.MUSIC_DIR)
            return []
        return [f for f in os.listdir(cls.MUSIC_DIR) if f.endswith(('.mp3', '.wav', '.ogg'))]