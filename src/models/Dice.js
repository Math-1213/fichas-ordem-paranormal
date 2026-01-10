import { PERICIAS_MAP, ATRIBUTOS_MAP } from "../configs/dice";
import { TREINO_BONUS } from "../configs/skills";

/**
 * Classe utilitária para processamento de rolagens de dados e interpretação de fórmulas.
 * Esta classe é estática e não deve ser instanciada.
 */
export default class Dice {
  /**
   * Executa uma rolagem física de dados e aplica lógica de vantagem/desvantagem.
   * * @param {string} diceType - O tipo do dado (ex: "d20", "d6").
   * @param {number} quantity - Quantidade base de dados (ex: valor do Atributo).
   * @param {"soma" | "teste"} rollType - "soma" para danos/curas, "teste" para pegar o melhor resultado.
   * @param {number} [bonus=0] - Valor fixo somado ao final.
   * @param {number} [modifier=0] - Modificador de dados (Vantagem +1, Desvantagem -1).
   * * @returns {Object} Objeto contendo os detalhes da rolagem e o total calculado.
   */
  static roll(diceType, quantity, rollType, bonus = 0, modifier = 0) {
    const sides = Dice.#parseDice(diceType);

    let finalQuantity = quantity + modifier;
    let forceWorst = false;

    // Regra de Ordem Paranormal: Se a reserva de dados for <= 0,
    // rola-se 2 e pega o pior resultado.
    if (finalQuantity <= 0) {
      finalQuantity = 2;
      forceWorst = true;
    }

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
   * Gera números aleatórios simulando dados físicos.
   * @private
   */
  static #rollDice(quantity, sides) {
    return Array.from(
      { length: quantity },
      () => Math.floor(Math.random() * sides) + 1
    );
  }

  /**
   * Extrai o número de lados de uma string "dX".
   * @private
   */
  static #parseDice(diceType) {
    if (typeof diceType !== "string" || !diceType.startsWith("d")) {
      throw new Error("Tipo de dado inválido");
    }
    const sides = Number(diceType.slice(1));
    if (isNaN(sides) || sides <= 0) throw new Error("Tipo de dado inválido");
    return sides;
  }

  /**
   * Resolve uma variável entre barras (ex: /FOR/) para seu valor numérico.
   * Busca em abreviações de atributos, perícias ou nomes completos.
   * * @private
   * @param {string} key - A chave enviada (ex: "FOR", "Luta").
   * @param {Object} atributos - Mapa de atributos do personagem.
   * @param {Object} pericias - Mapa de perícias do personagem.
   * @returns {number} O valor numérico correspondente.
   */
  static #resolveVariable(key, atributos, pericias) {
    if (!key) return 0;
    const rawKey = key.toUpperCase();

    // 1. Busca por sigla de Atributo (ex: FOR)
    if (ATRIBUTOS_MAP[rawKey]) {
      const attrName = ATRIBUTOS_MAP[rawKey];
      return Number(atributos?.[attrName] ?? 0);
    }

    // 2. Busca por sigla de Perícia (ex: LUTA)
    if (PERICIAS_MAP[rawKey]) {
      const perName = PERICIAS_MAP[rawKey];
      const pericia = pericias?.[perName];
      if (!pericia) return 0;

      const treinoBonus = TREINO_BONUS[pericia.treino] ?? 0;
      const bonus = pericia.bonus ?? 0;

      return treinoBonus + bonus;
    }

    // 3. Busca por nome completo (Atributo ou Perícia)
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
   * O "Cérebro" da classe. Interpreta uma string complexa e retorna as rolagens processadas.
   * Suporta variáveis (/INT/), bônus matemáticos (2*3) e múltiplos dados.
   * * @example
   * parseRollExpression("/INT/d20 + /LUTA/ + 2", char, "teste")
   * * @param {string} expression - A fórmula da rolagem (ex: "/FOR/d20 + 5").
   * @param {Object} characterContext - Objeto contendo { atributos, pericias }.
   * @param {"soma" | "teste"} rollType - Como tratar os dados encontrados na string.
   * @returns {Object} Objeto com { rolls: Array, bonus: number }.
   */
  static parseRollExpression(
    expression,
    { atributos = {}, pericias = {} },
    rollType = "soma"
  ) {
    let expr = expression.toLowerCase();

    // Resolver variáveis com fallback de segurança (?)
    // O operador ? nas strings do JSON indica um valor mínimo de 1.
    expr = expr.replace(/\/([^/]+)\/\?/gi, (_, key) =>
      Dice.#resolveVariable(key, atributos, pericias)
    );
    expr = expr.replace(/\?/g, "1");

    // Resolve variáveis padrão /XXX/
    expr = expr.replace(/\/([^/]+)\//gi, (_, key) =>
      Dice.#resolveVariable(key, atributos, pericias)
    );
    expr = expr.replace(/\s+/g, "");

    const diceRegex = /(\d*)d(\d+)/gi;
    let rolls = [];

    // Identifica cada "XdY" na string, rola-os e substitui por "0" para isolar o bônus
    expr = expr.replace(diceRegex, (match, qty, sides) => {
      const quantity = qty ? Number(qty) : 1;
      const roll = Dice.roll(`d${sides}`, quantity, rollType);
      rolls.push(roll);
      return "0";
    });

    // Calcula o que sobrou da string (matemática pura) usando um avaliador seguro
    let baseBonus = 0;
    try {
      if (!/^[\d+\-*/().]+$/.test(expr))
        throw new Error("Caracteres inválidos");
      baseBonus = Function(`"use strict"; return (${expr})`)();
    } catch (e) {
      throw new Error("Erro no cálculo do bônus: " + e.message);
    }

    return { rolls, bonus: baseBonus };
  }
}
