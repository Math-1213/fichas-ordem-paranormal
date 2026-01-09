import { TREINO_BONUS } from "../configs/skills";

export default class Character {
  /**
   * Cria uma instância de personagem a partir dos dados do JSON.
   * @param {Object} data Dados completos do personagem
   * @param {Object} data.infos Informações gerais do personagem
   * @param {Object} data.atributos Atributos base (força, agilidade, etc)
   * @param {Object} data.pericias Perícias do personagem
   * @param {Object} data.status Status vitais (vida, sanidade, esforço)
   * @param {Object} data.poderes Habilidades e Poderes do personagem
   * @param {Object} data.inventario Armas, Equipamentos e Itens
   * @param {Object} data.rituais Lista de Rituais
   * @param {Object} data.dados Lista de Dados Customizados
   */
  constructor(data) {
    this.infos = data.infos;
    this.atributos = data.atributos;
    this.pericias = data.pericias;
    this.status = data.status;
    this.poderes = data.poderes;
    this.inventario = data.inventario;
    this.rituais = data.rituais
    this.dados = data.dados
  }

  /**
   * Retorna o valor bruto de um atributo.
   * Caso o atributo não exista, retorna 0.
   *
   * @param {string} nome Nome do atributo (ex: "forca", "intelecto")
   * @returns {number} Valor do atributo
   */
  getAtributo(nome) {
    return this.atributos[nome] ?? 0;
  }

  /**
   * Retorna o valor treinado de uma perícia.
   * Caso a perícia não exista, retorna 0.
   * Não soma o bonus da pericia
   *
   * @param {string} nome Nome da perícia (ex: "ocultismo", "investigacao")
   * @returns {number} Grau da perícia
   */
  getPericia(nome) {
    const pericia = this.pericias[nome];
    return TREINO_BONUS[pericia.treino] ?? 0;
  }

  /**
   * Retorna o valor treinado de uma perícia.
   * Caso a perícia não exista, retorna 0.
   * Diferente da versão normal soma o bonus.
   *
   * @param {string} nome Nome da perícia (ex: "ocultismo", "investigacao")
   * @returns {number} Grau da perícia
   */
  getFullPericia(nome) {
    const pericia = this.pericias[nome];
    return TREINO_BONUS[pericia.treino] + pericia.bonus ?? 0;
  }

  /**
   * Calcula o modificador de um atributo seguindo a regra:
   * (atributo - 1) / 2, arredondado para baixo.
   *
   * @param {string} nome Nome do atributo
   * @returns {number} Modificador do atributo
   */
  getModificadorAtributo(nome) {
    return Math.floor((this.getAtributo(nome) - 1) / 2);
  }

  /**
   * Retorna o deslocamento do personagem em quadrados,
   * convertido a partir do valor em metros.
   *
   * @returns {number} Deslocamento em quadrados
   */
  getDeslocamentoQuadrados() {
    return Character.metrosParaQuadrados(this.infos.deslocamento);
  }

  /**
   * Converte metros em quadrados de deslocamento.
   * Regra: a cada 3 metros ≈ 2 quadrados.
   *
   * @param {number} metros Valor do deslocamento em metros
   * @returns {number} Valor convertido em quadrados
   */
  static metrosParaQuadrados(metros) {
    return Math.floor((2 * metros) / 3);
  }
}
