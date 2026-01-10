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
