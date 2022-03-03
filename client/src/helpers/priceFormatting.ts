export function formatNumberDigits(
  numberStr: string | number,
  digits: number
): string {
  return Number(numberStr).toFixed(digits);
}

export function formatPercentChangeDigits(
  percentChange: number,
  digits: number
): number {
  return +percentChange.toFixed(digits);
}
