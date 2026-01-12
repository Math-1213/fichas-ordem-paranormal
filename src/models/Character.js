import { TREINO_BONUS } from "../configs/skills";

/**
 * @typedef {Object} Pericia
 * @property {string} treino - Nível de treinamento ("destreinado", "treinado", "especialista", "mestre")
 * @property {number} bonus - Bônus numérico adicional vindo de itens ou poderes
 */

/**
 * @typedef {Object} ItemInventario
 * @property {string} nome - Nome do item
 * @property {number} peso - Peso unitário
 * @property {number} [quantidade] - Quantidade atual (padrão 1)
 * @property {string} tipo - "arma", "equipamento" ou "item"
 * @property {string} [teste] - Expressão de teste (ex: "/FOR/d20 + /LUTA/")
 */

export default class Character {
  /**
   * Cria uma instância de personagem.
   * @param {Object} data - Dados brutos do JSON
   * @param {Object} data.id - Nome do arquivo no back e chave unica de identificação
   * @param {Object} data.infos - Informações gerais (nome, classe, trilha, deslocamento, carga)
   * @param {Object.<string, number>} data.atributos - Mapa de atributos (ex: { forca: 2, agilidade: 3 })
   * @param {Object.<string, Pericia>} data.pericias - Mapa de perícias com treino e bônus
   * @param {Object} data.status - Status vitais (PV, SAN, PE)
   * @param {Array} data.poderes - Lista de habilidades e poderes
   * @param {Array<ItemInventario>} data.inventario - Lista de itens, armas e equipamentos
   * @param {Array} data.rituais - Lista de rituais conhecidos
   * @param {Array} data.dados - Configurações de dados customizados
   */
  constructor(data) {
    this.id = data.id;
    this.infos = data.infos;
    this.atributos = data.atributos;
    this.pericias = data.pericias;
    this.status = data.status;
    this.poderes = data.poderes;
    this.inventario = data.inventario;
    this.rituais = data.rituais;
    this.dados = data.dados;
  }

  /**
   * Retorna o valor bruto de um atributo (ex: 2, 3, 4).
   * @param {string} nome - Nome do atributo em minúsculo (ex: "forca")
   * @returns {number} Valor do atributo ou 0 se não encontrado
   */
  getAtributo(nome) {
    return this.atributos[nome] ?? 0;
  }

  /**
   * Retorna apenas o bônus numérico derivado do nível de treinamento da perícia.
   * Não inclui bônus fixos de itens ou poderes.
   * @param {string} nome - Nome da perícia em minúsculo (ex: "atletismo")
   * @returns {number} Bônus de treino (0, 5, 10 ou 15)
   */
  getPericia(nome) {
    const pericia = this.pericias[nome];
    return TREINO_BONUS[pericia.treino] ?? 0;
  }

  /**
   * Retorna o bônus total de uma perícia (Treinamento + Bônus fixos).
   * Ideal para ser usado em cálculos de rolagens.
   * @param {string} nome - Nome da perícia em minúsculo
   * @returns {number} Valor total da perícia (Treino + Bônus)
   */
  getFullPericia(nome) {
    const pericia = this.pericias[nome];
    return TREINO_BONUS[pericia.treino] + pericia.bonus ?? 0;
  }

  /**
   * Calcula o modificador de um atributo (Regra de Ordem Paranormal).
   * @example Se atributo é 3, modificador é floor((3-1)/2) = 1.
   * @param {string} nome - Nome do atributo
   * @returns {number} Modificador calculado
   */
  getModificadorAtributo(nome) {
    return Math.floor((this.getAtributo(nome) - 1) / 2);
  }

  /**
   * Retorna o deslocamento convertido em quadrados para uso em mapas.
   * @returns {number} Distância em quadrados (arredondado para baixo)
   */
  getDeslocamentoQuadrados() {
    return Character.metrosParaQuadrados(this.infos.deslocamento);
  }

  /**
   * Converte metros em quadrados (Regra: 3 metros = 2 quadrados).
   * @param {number} metros - Distância em metros
   * @returns {number} Distância em quadrados
   */
  static metrosParaQuadrados(metros) {
    return Math.floor((2 * metros) / 3);
  }
}
