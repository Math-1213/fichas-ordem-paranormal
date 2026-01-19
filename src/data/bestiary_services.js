import { BASE_URL } from "./API";
const API_URL = `${BASE_URL}/bestiary`;

export const BestiaryService = {
  /**
   * Lista todas as entidades do bestiário.
   * GET /bestiary
   */
  async listAll() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar criaturas");
      return await response.json();
    } catch (error) {
      console.error("BestiaryService listAll:", error);
      return [];
    }
  },

  /**
   * Busca uma entidade específica pelo ID.
   * GET /bestiary/:id
   */
  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Entidade não encontrada");
      return await response.json();
    } catch (error) {
      console.error("BestiaryService getById:", error);
      return null;
    }
  },

  /**
   * Catalogar uma nova criatura.
   * POST /bestiary
   */
  async create(creature) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creature),
      });

      if (!response.ok) throw new Error("Erro ao catalogar entidade");
      return await response.json();
    } catch (error) {
      console.error("BestiaryService create:", error);
      throw error;
    }
  },

  /**
   * Atualiza o registro de uma entidade existente.
   * PUT /bestiary/:id
   */
  async update(id, creature) {
    try {
      // Nota: Verifique se o seu backend aceita PUT no /bestiary/:id
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creature),
      });

      if (!response.ok) throw new Error("Erro ao atualizar entidade");
      return await response.json();
    } catch (error) {
      console.error("BestiaryService update:", error);
      throw error;
    }
  },

  /**
   * Remove uma entidade do arquivo.
   * DELETE /bestiary/:id
   */
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar entidade");
      return true;
    } catch (error) {
      console.error("BestiaryService delete:", error);
      return false;
    }
  },
};
