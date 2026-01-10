export function toRoman(num) {
  if (num <= 0 || num > 100) return "";

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
