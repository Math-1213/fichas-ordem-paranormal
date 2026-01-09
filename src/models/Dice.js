import { PERICIAS_MAP, ATRIBUTOS_MAP } from "../configs/dice";
import { TREINO_BONUS } from "../configs/skills";

/**
 * Classe utilitária para rolagens de dados.
 * Não deve ser instanciada.
 *
 * Suporta:
 * - rolagens de soma (ex: dano)
 * - rolagens de teste (ex: testes de perícia)
 * - bônus numéricos
 * - vantagem e desvantagem por modificador de dados
 */
export default class Dice {
  /**
   * Realiza uma rolagem de dados.
   *
   * @param {string} diceType Tipo do dado (ex: "d4", "d6", "d20")
   * @param {number} quantity Quantidade base de dados a serem rolados
   * @param {"soma" | "teste"} rollType Tipo de rolagem:
   * - "soma": soma todos os dados rolados
   * - "teste": seleciona o maior resultado (ou o pior em caso de desvantagem extrema)
   * @param {number} [bonus=0] Valor fixo somado ao resultado final
   * @param {number} [modifier=0] Modificador de quantidade de dados:
   * - positivo: vantagem
   * - negativo: desvantagem
   *
   * @returns {Object} Resultado detalhado da rolagem
   * @returns {string} returns.dice Tipo do dado utilizado
   * @returns {number} returns.baseQuantity Quantidade base de dados
   * @returns {number} returns.modifier Modificador aplicado (vantagem/desvantagem)
   * @returns {number} returns.finalQuantity Quantidade final de dados rolados
   * @returns {number[]} returns.rolls Lista com os valores de cada dado rolado
   * @returns {"soma" | "teste"} returns.rollType Tipo de rolagem executada
   * @returns {number} returns.bonus Bônus aplicado
   * @returns {number} returns.result Resultado base antes do bônus
   * @returns {number} returns.total Resultado final com bônus
   * @returns {boolean} returns.forcedWorst Indica se o pior resultado foi forçado
   */
  static roll(diceType, quantity, rollType, bonus = 0, modifier = 0) {
    const sides = Dice.#parseDice(diceType);

    let finalQuantity = quantity + modifier;
    let forceWorst = false;

    // Caso a quantidade final seja zero ou negativa,
    // força a rolagem de 2 dados e seleciona o pior resultado
    if (finalQuantity <= 0) {
      finalQuantity = 2;
      forceWorst = true;
    }

    // Segurança mínima (nunca rolar menos de 1 dado)
    if (finalQuantity < 1) finalQuantity = 1;

    const rolls = Dice.#rollDice(finalQuantity, sides);

    let baseResult;

    if (rollType === "soma") {
      baseResult = rolls.reduce((a, b) => a + b, 0);
    } else if (rollType === "teste") {
      baseResult = forceWorst ? Math.min(...rolls) : Math.max(...rolls);
    } else {
      throw new Error("Tipo de rolagem inválido");
    }

    const total = baseResult + bonus;

    return {
      dice: diceType,
      baseQuantity: quantity,
      modifier,
      finalQuantity,
      rolls,
      rollType,
      bonus,
      result: baseResult,
      total,
      forcedWorst: forceWorst,
    };
  }

  /**
   * Rola uma quantidade específica de dados com N lados.
   *
   * @private
   * @param {number} quantity Quantidade de dados
   * @param {number} sides Número de lados do dado
   * @returns {number[]} Lista de valores rolados
   */
  static #rollDice(quantity, sides) {
    return Array.from(
      { length: quantity },
      () => Math.floor(Math.random() * sides) + 1
    );
  }

  /**
   * Converte uma string de dado (ex: "d20") em número de lados.
   *
   * @private
   * @param {string} diceType Tipo do dado
   * @returns {number} Número de lados do dado
   * @throws {Error} Caso o tipo de dado seja inválido
   */
  static #parseDice(diceType) {
    if (typeof diceType !== "string" || !diceType.startsWith("d")) {
      throw new Error("Tipo de dado inválido");
    }

    const sides = Number(diceType.slice(1));

    if (isNaN(sides) || sides <= 0) {
      throw new Error("Tipo de dado inválido");
    }

    return sides;
  }

  static #resolveVariable(key, atributos, pericias) {
    if (!key) return 0;

    const rawKey = key.toUpperCase();

    // ATRIBUTOS (INT, FOR, etc)
    if (ATRIBUTOS_MAP[rawKey]) {
      const attrName = ATRIBUTOS_MAP[rawKey];
      return Number(atributos?.[attrName] ?? 0);
    }

    // PERÍCIAS (LUTA, ATLE, etc)
    if (PERICIAS_MAP[rawKey]) {
      const perName = PERICIAS_MAP[rawKey];
      const pericia = pericias?.[perName];

      if (!pericia) return 0;

      const treinoBonus = TREINO_BONUS[pericia.treino] ?? 0;
      const bonus = pericia.bonus ?? 0;

      return treinoBonus + bonus;
    }

    // Nome completo digitado (ex: /luta/, /intelecto/)
    const attrByName = Object.entries(ATRIBUTOS_MAP).find(
      ([, name]) => name.toLowerCase() === key.toLowerCase()
    );
    if (attrByName) {
      return Number(atributos?.[attrByName[1]] ?? 0);
    }

    const perByName = Object.entries(PERICIAS_MAP).find(
      ([, name]) => name.toLowerCase() === key.toLowerCase()
    );
    if (perByName) {
      const pericia = pericias?.[perByName[1]];
      if (!pericia) return 0;

      const treinoBonus = TREINO_BONUS[pericia.treino] ?? 0;
      const bonus = pericia.bonus ?? 0;

      return treinoBonus + bonus;
    }

    throw new Error(`Variável desconhecida: ${key}`);
  }

  /**
   * Converte uma string de expressão (ex: "/INT/d10 + /LUTA/") em uma rolagem.
   *
   * @private
   * @param {string} expression Expressão
   * @param {Object} characterInfos As informações do atributos e Pericias
   * @param {string} rollType Se é um teste ou uma soma
   * @returns {Object} Retorna a expressão original, expressão formatada, os dados, e o bonus
   */
  static parseRollExpression(
    expression,
    { atributos = {}, pericias = {} },
    rollType = "soma"
  ) {
    // /INT/D20+/FOR/ + 2*2d8

    let expr = expression.toLowerCase()

    // Resolver variáveis e operador ?
    expr = expr.replace(/\/([^/]+)\/\?/gi, (_, key) =>
      Dice.#resolveVariable(key, atributos, pericias)
    );
    expr = expr.replace(/\?/g, "1");

    expr = expr.replace(/\/([^/]+)\//gi, (_, key) =>
      Dice.#resolveVariable(key, atributos, pericias)
    );
    expr = expr.replace(/\s+/g, "");

    // Capturar dados SEM consumir o bônus
    const diceRegex = /(\d*)d(\d+)/gi;

    let rolls = [];
    expr = expr.replace(diceRegex, (match, qty, sides) => {
      const quantity = qty ? Number(qty) : 1;

      const roll = Dice.roll(`d${sides}`, quantity, rollType);

      rolls.push(roll);

      // substitui por 0 para sobrar só o bônus matemático
      return "0";
    });

    // Avaliar somente o bônus fixo
    let baseBonus = 0;
    try {
      if (!/^[\d+\-*/().]+$/.test(expr)) {
        throw new Error("Expressão inválida após parsing");
      }

      baseBonus = Function(`"use strict"; return (${expr})`)();
    } catch (e) {
      throw new Error("Erro ao calcular bônus: " + e.message);
    }
    console.log({
      rolls,
      bonus: baseBonus
    })
    // return {
    //   rolls,
    //   bonus: baseBonus
    // };
  }
}
