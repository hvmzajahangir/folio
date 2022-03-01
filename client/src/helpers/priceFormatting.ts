export function formatNumberDigits(
  numberStr: string | number,
  digits: number
): string {
  return Number(numberStr).toFixed(digits);
}

export function formatChangePercentDigits(
  changePercentStr: string,
  digits: number
): string {
  return Number(changePercentStr.slice(0, -1)).toFixed(digits);
}
