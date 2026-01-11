/**
 * Dicionário de Elementos Paranormais.
 * @constant {Object}
 */
export const ELEMENTS = {
  sangue: "Sangue",
  morte: "Morte",
  conhecimento: "Conhecimento",
  energia: "Energia",
  medo: "Medo",
  nenhum: "Nenhum",
};

export const ELEMENT_DATA = {
  // O caminho começa com / pois o React entende que parte da pasta public
  sangue: { color: "#ff1744", icon: "/elementos/Sangue.png" },
  morte: { color: "#757575", icon: "/elementos/Morte.png" },
  conhecimento: { color: "#ffea00", icon: "/elementos/Conhecimento.png" },
  energia: { color: "#9D00FF", icon: "/elementos/Energia.png" },
  medo: { color: "#ffffff", icon: "/elementos/Medo.png" },
  vazio: { color: "#2a2f3e", icon: "" },
};

/**
 * Converte uma chave de elemento para sua versão amigável de exibição.
 * * @param {string|any} element - A chave do elemento (ex: "morte" ou "MORTE").
 * @returns {string|undefined} O nome formatado do elemento ou undefined se não encontrado.
 * * @example
 * translateElement("energia") // Retorna "Energia"
 * translateElement("SANGUE")  // Retorna "Sangue"
 */
export function getElementText(element) {
  return ELEMENTS[String(element).toLowerCase()] || null;
}
