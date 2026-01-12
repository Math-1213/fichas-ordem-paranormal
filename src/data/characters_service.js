const API_URL = "http://localhost:5001/characters";

export const CharacterService = {
  // Substitui o seu antigo 'characters' exportado
  async listSummary() {
    try {
      const response = await fetch(`${API_URL}/summary`);
      if (!response.ok) throw new Error("Erro ao buscar sumário");
      return await response.json(); // Retorna [{id, nome}, ...]
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  // Busca o personagem completo quando um for selecionado
  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Personagem não encontrado");
      const data = await response.json();

      // Retorna no formato que você usava antes para não quebrar o resto do app
      return {
        id: data.id,
        nome: data.infos.nome,
        data: data,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async updateStatus(id, newStatus) {
    try {
      const response = await fetch(`${API_URL}/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStatus),
      });
      return response.ok;
    } catch (error) {
      console.error("Erro ao salvar status:", error);
      return false;
    }
  },
};
