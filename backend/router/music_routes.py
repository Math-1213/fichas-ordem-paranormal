from flask import Blueprint, request, jsonify, send_from_directory, Response
from backend.controllers.music_controller import MusicController
import json
import time

music_bp = Blueprint("music", __name__, url_prefix="/music")

@music_bp.get("/")
def get_music():
    return jsonify(MusicController.get_current())

@music_bp.post("/set")
def set_music():
    data = request.json
    return jsonify(MusicController.update_track(data)), 200

@music_bp.get("/files")
def list_files():
    # Rota útil para o mestre saber o que tem na pasta
    return jsonify(MusicController.list_available_files())

@music_bp.get("/stream/<path:filename>")
def stream_file(filename):
    """Serve o arquivo físico da pasta backend/data/musics"""
    return send_from_directory(MusicController.MUSIC_DIR, filename)

@music_bp.get("/stream-events")
def stream_events():
    def event_generator():
        last_url = None
        while True:
            current = MusicController.get_current()
            # Só envia mensagem se o estado mudou (trocou música ou parou)
            if current["url"] != last_url:
                last_url = current["url"]
                yield f"data: {json.dumps(current)}\n\n"
            time.sleep(1) # Checa a cada 1 segundo no servidor
            
    return Response(event_generator(), mimetype="text/event-stream")