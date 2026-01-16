import customtkinter as ctk
import requests
import threading
from queue import Queue

# Configurações
BASE_URL = "http://localhost:5001/music"

class MasterControlGUI(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("🌀 Painel do Mestre - Áudio")
        self.geometry("400x550")
        ctk.set_appearance_mode("dark")
        
        # Fila para comunicação entre Threads
        self.update_queue = Queue()

        # --- Cabeçalho ---
        self.label_status = ctk.CTkLabel(self, text="Status: Iniciando...", font=("Roboto", 16, "bold"))
        self.label_status.pack(pady=20)

        # --- Lista de Músicas ---
        ctk.CTkLabel(self, text="Músicas Disponíveis", font=("Roboto", 11, "italic")).pack(pady=0)
        self.scroll_frame = ctk.CTkScrollableFrame(self, width=350, height=250)
        self.scroll_frame.pack(pady=10, padx=20)

        # --- Controles ---
        self.btn_stop = ctk.CTkButton(
            self, text="🛑 PARAR TUDO", 
            fg_color="#ef4444", hover_color="#991b1b", 
            font=("Roboto", 13, "bold"),
            command=self.stop_music
        )
        self.btn_stop.pack(pady=10)

        self.btn_refresh = ctk.CTkButton(
            self, text="🔄 Atualizar Lista", 
            fg_color="transparent", border_width=1,
            border_color="#9aa0b3", text_color="#9aa0b3",
            command=self.refresh_list
        )
        self.btn_refresh.pack(pady=5)

        # Inicia loops
        self.refresh_list()
        self.check_status_loop()
        self.process_queue()

    def process_queue(self):
        """Processa mensagens vindas das threads de rede para atualizar a UI com segurança"""
        while not self.update_queue.empty():
            msg_type, data = self.update_queue.get()
            if msg_type == "STATUS":
                self.apply_status_update(data)
            elif msg_type == "LIST":
                self.apply_list_update(data)
        self.after(100, self.process_queue)

    # --- Funções de Segundo Plano (Threading) ---
    def run_async(self, func, *args):
        threading.Thread(target=func, args=args, daemon=True).start()

    def refresh_list(self):
        self.btn_refresh.configure(state="disabled", text="Carregando...")
        self.run_async(self._bg_refresh_list)

    def _bg_refresh_list(self):
        try:
            res = requests.get(f"{BASE_URL}/files", timeout=3)
            self.update_queue.put(("LIST", res.json()))
        except:
            self.update_queue.put(("LIST", None))

    def play_music(self, filename):
        self.run_async(self._bg_send_command, {"filename": filename})

    def stop_music(self):
        self.run_async(self._bg_send_command, {"filename": None})

    def _bg_send_command(self, payload):
        try:
            requests.post(f"{BASE_URL}/set", json=payload, timeout=2)
            # Força atualização de status após comando
            self._bg_update_status()
        except:
            pass

    def check_status_loop(self):
        self.run_async(self._bg_update_status)
        self.after(3000, self.check_status_loop)

    def _bg_update_status(self):
        try:
            res = requests.get(f"{BASE_URL}/", timeout=2)
            self.update_queue.put(("STATUS", res.json()))
        except:
            self.update_queue.put(("STATUS", "OFFLINE"))

    # --- Atualizações de UI (Rodam na Main Thread) ---
    def apply_list_update(self, files):
        self.btn_refresh.configure(state="normal", text="🔄 Atualizar Lista")
        for widget in self.scroll_frame.winfo_children():
            widget.destroy()
        
        if files is None:
            ctk.CTkLabel(self.scroll_frame, text="Erro ao conectar no Servidor", text_color="#ef4444").pack(pady=10)
            return
        if not files:
            ctk.CTkLabel(self.scroll_frame, text="Nenhuma música encontrada").pack(pady=10)
            return

        for file in files:
            btn = ctk.CTkButton(
                self.scroll_frame, 
                text=f"🎵 {file.replace('.mp3', '').replace('_', ' ')}", 
                anchor="w", fg_color="#1c212b", hover_color="#2a2f3e",
                command=lambda f=file: self.play_music(f)
            )
            btn.pack(fill="x", pady=2, padx=5)

    def apply_status_update(self, data):
        if data == "OFFLINE":
            self.label_status.configure(text="Status: Flask Offline", text_color="#ef4444")
            return
        
        title = data.get("title")
        if title:
            display_title = (title[:30] + '..') if len(title) > 30 else title
            self.label_status.configure(text=f"Tocando: {display_title}", text_color="#22c55e")
        else:
            self.label_status.configure(text="Status: Silêncio", text_color="#9aa0b3")

if __name__ == "__main__":
    app = MasterControlGUI()
    app.mainloop()