import currency from "currency.js";

export function calculateExecutionTotal(
  quantity: number,
  price: number
): number {
  const total = currency(price, { precision: 8 }).multiply(
    currency(quantity, { precision: 8 })
  ).value;
  return currency(total, { precision: 2 }).value;
}

export function formatExecutionTotal(executionTotal: number): string {
  return currency(executionTotal).format();
}
