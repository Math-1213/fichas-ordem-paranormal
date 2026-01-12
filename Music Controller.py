import customtkinter as ctk
import requests
import os

# Configurações
BASE_URL = "http://localhost:5001/music"

class MasterControlGUI(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("🌀 Painel do Mestre - Áudio")
        self.geometry("400x550")
        ctk.set_appearance_mode("dark")
        
        # --- Cabeçalho ---
        self.label_status = ctk.CTkLabel(self, text="Status: Carregando...", font=("Roboto", 16, "bold"))
        self.label_status.pack(pady=20)

        # --- Lista de Músicas ---
        # Removi o label_text direto para evitar problemas de compatibilidade e usei um Label acima
        ctk.CTkLabel(self, text="Músicas Disponíveis", font=("Roboto", 12)).pack(pady=0)
        self.scroll_frame = ctk.CTkScrollableFrame(self, width=350, height=250)
        self.scroll_frame.pack(pady=10, padx=20)

        # --- Controles ---
        self.btn_stop = ctk.CTkButton(
            self, 
            text="🛑 PARAR TUDO", 
            fg_color="#ef4444", 
            hover_color="#991b1b", 
            font=("Roboto", 13, "bold"),
            command=self.stop_music
        )
        self.btn_stop.pack(pady=10)

        # CORREÇÃO AQUI: Em vez de 'variant', usamos border_width e fg_color="transparent"
        self.btn_refresh = ctk.CTkButton(
            self, 
            text="🔄 Atualizar Lista", 
            fg_color="transparent", 
            border_width=1,
            border_color="#9aa0b3",
            text_color="#9aa0b3",
            command=self.refresh_list
        )
        self.btn_refresh.pack(pady=5)

        # Iniciar interface
        self.refresh_list()
        self.update_status()

    def refresh_list(self):
        # Limpa lista atual
        for widget in self.scroll_frame.winfo_children():
            widget.destroy()

        try:
            response = requests.get(f"{BASE_URL}/files", timeout=2)
            files = response.json()
            if not files:
                ctk.CTkLabel(self.scroll_frame, text="Pasta 'data/musics' vazia").pack(pady=10)
                return

            for file in files:
                btn = ctk.CTkButton(
                    self.scroll_frame, 
                    text=f"🎵 {file.replace('.mp3', '').replace('_', ' ')}", 
                    anchor="w",
                    fg_color="#1c212b",
                    hover_color="#2a2f3e",
                    command=lambda f=file: self.play_music(f)
                )
                btn.pack(fill="x", pady=2, padx=5)
        except Exception as e:
            ctk.CTkLabel(self.scroll_frame, text=f"Erro de conexão: {e}").pack(pady=10)

    def play_music(self, filename):
        try:
            requests.post(f"{BASE_URL}/set", json={"filename": filename}, timeout=2)
            self.update_status()
        except:
            pass

    def stop_music(self):
        try:
            requests.post(f"{BASE_URL}/set", json={"filename": None}, timeout=2)
            self.update_status()
        except:
            pass

    def update_status(self):
        try:
            response = requests.get(f"{BASE_URL}/", timeout=1)
            data = response.json()
            title = data.get("title")
            if title:
                # Se o título for muito longo, corta para não quebrar a UI
                display_title = (title[:30] + '..') if len(title) > 30 else title
                self.label_status.configure(text=f"Tocando: {display_title}", text_color="#22c55e")
            else:
                self.label_status.configure(text="Status: Silêncio", text_color="#9aa0b3")
        except:
            self.label_status.configure(text="Status: Flask Offline", text_color="#ef4444")
        
        # Agenda a próxima atualização do status (a cada 3 segundos)
        self.after(3000, self.update_status)

if __name__ == "__main__":
    app = MasterControlGUI()
    app.mainloop()