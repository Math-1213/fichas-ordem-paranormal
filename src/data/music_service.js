const API_URL = "http://localhost:5001/music";

export const MusicService = {
  // Chamado pelos jogadores (Polling)
  async getCurrentTrack() {
    const res = await fetch(`${API_URL}/`);
    return await res.json();
  },

  // Chamado pela interface do Mestre
  async setTrack(filename) {
    const res = await fetch(`${API_URL}/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    return await res.json();
  },

  async listFiles() {
    const res = await fetch(`${API_URL}/files`);
    return await res.json();
  }
};