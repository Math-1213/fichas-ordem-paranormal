import Dice from "../models/Dice";
/**
 * @file Mapeamentos de chaves curtas para nomes de propriedades do Personagem.
 * Utilizado pelo motor de rolagens (Dice.js) para traduzir /SIGLA/ em valores reais.
 */

/**
 * ATRIBUTOS_MAP
 * * Converte acrônimos de 3 letras (usados em fórmulas de dados e itens)
 * para a chave correspondente no objeto 'character.atributos'.
 * * @type {Object.<string, string>}
 * @example /FOR/ -> character.atributos.forca
 */
export const ATRIBUTOS_MAP = {
  FOR: "forca",
  AGI: "agilidade",
  INT: "intelecto",
  VIG: "vigor",
  PRE: "presenca",
};

/**
 * PERICIAS_MAP
 * * Converte acrônimos de 4 letras (usados em fórmulas de dados e itens)
 * para a chave correspondente no objeto 'character.pericias'.
 * * Nota: Siglas padronizadas para facilitar a escrita em arquivos JSON.
 * * @type {Object.<string, string>}
 * @example /LUTA/ -> character.pericias.luta
 */
export const PERICIAS_MAP = {
  ACRO: "acrobacia",
  ADES: "adestramento",
  ARTE: "artes",
  ATLE: "atletismo",
  ATUA: "atualidades",
  CIEN: "ciencias",
  CRIM: "crime",
  DIPL: "diplomacia",
  ENGA: "enganacao",
  FORT: "fortitude",
  FURT: "furtividade",
  INIC: "iniciativa",
  INTI: "intimidacao",
  INTU: "intuicao",
  INVE: "investigacao",
  LUTA: "luta",
  MEDI: "medicina",
  OCUL: "ocultismo",
  PERC: "percepcao",
  PILO: "pilotagem",
  PONT: "pontaria",
  PROF: "profissao",
  REFL: "reflexos",
  RELI: "religiao",
  SOBR: "sobrevivencia",
  TATI: "tatica",
  TECN: "tecnologia",
  VONT: "vontade",
};

/**
 * Traduz chaves de sistema em valores numéricos reais do personagem.
 * * Esta função percorre uma string em busca de marcadores entre barras (ex: /FOR/, /LUTA/)
 * e os substitui pelos valores correspondentes de Atributos ou Perícias.
 * * @param {string} expr - A expressão original contendo as chaves (ex: "Dano: 1d8 + /FOR/").
 * @param {Object} character - A instância do personagem para extração dos dados.
 * @returns {string} A expressão formatada com os valores numéricos (ex: "Dano: 1d8 + 3").
 * * @logic
 * 1. Identifica chaves usando a Regex `/([A-Z]{3,})/g` (procura 3 ou mais letras maiúsculas entre barras).
 * 2. Prioridade 1: Tenta mapear a chave para um Atributo (ex: FOR, AGI).
 * 3. Prioridade 2: Se não for atributo, tenta mapear para uma Perícia e soma (Bônus de Treino + Bônus Extra).
 * 4. Fallback: Retorna "0" caso a chave não seja encontrada em nenhum dos mapas.
 */
export function formatExpression(expr, character) {
  if (!expr) return "";

  // Substitui /XXX/ pelo valor do Atributo ou bônus da Perícia
  return expr.replace(/\/([A-Z]{3,})\//g, (match, key) => {
    const upperKey = key.toUpperCase();

    // Tenta Atributo
    if (ATRIBUTOS_MAP[upperKey]) {
      return character.atributos?.[ATRIBUTOS_MAP[upperKey]] ?? 0;
    }

    // Tenta Perícia
    if (PERICIAS_MAP[upperKey]) {
      const perData = character.pericias?.[PERICIAS_MAP[upperKey]] ?? {
        treino: "destreinado",
        bonus: 0,
      };
      return TREINO_BONUS[perData.treino] + perData.bonus;
    }

    return "0";
  });
}

/**
 * Executa uma rolagem de dados baseada em uma expressão complexa.
 * * @param {string} key - Identificador único (geralmente o ID do item) para armazenar o resultado.
 * @param {string} expression - A fórmula a ser calculada (ex: "1d20 + /FOR/").
 * @param {string} rollType - Tipo da rolagem para regras específicas (ex: "dano", "teste").
 * * @logic
 * Utiliza o método estático `Dice.parseRollExpression` para injetar os atributos e perícias
 * do personagem diretamente na fórmula antes de processar os dados físicos. O resultado
 * é armazenado no estado local `rolls`, mapeado pela `key`.
 */
export function handleRoll(
  key,
  expression,
  rollType = "soma",
  setRolls,
  character
) {
  try {
    const result = Dice.parseRollExpression(
      expression,
      {
        atributos: character.atributos, // Agora o character chegará aqui via argumento
        pericias: character.pericias,
      },
      rollType
    );

    setRolls((prev) => ({
      ...prev,
      [key]: result,
    }));
  } catch (error) {
    console.error("Erro na rolagem de dados:", error.message);
  }
}
