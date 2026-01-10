/**
 * toRoman
 * -------
 * Converte um número decimal em algarismos romanos.
 *
 * Regras:
 * - null, undefined, NaN ou valores não numéricos → "-"
 * - valores <= 0 → "-"
 * - valores > 100 → "-"
 * - valores válidos (1 a 100) → algarismos romanos
 *
 * Usado principalmente para exibição de categorias.
 */
export function toRoman(num) {
  // inválido ou não numérico
  if (num == null || typeof num !== "number" || Number.isNaN(num)) {
    return "-";
  }

  // fora do intervalo suportado
  if (num <= 0 || num > 100) {
    return "-";
  }

  const map = [
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";

  for (const { value, symbol } of map) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}
