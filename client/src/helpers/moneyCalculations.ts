import currency from "currency.js";

export function multiplyQuantityAndPrice(
  quantity: number,
  price: number
): number {
  const total = currency(price, { precision: 8 }).multiply(
    currency(quantity, { precision: 8 })
  ).value;
  return currency(total, { precision: 2 }).value;
}

export function formatMoney(money: number): string {
  return currency(money).format();
}

export function sumMoney(money1: number, money2: number): number {
  const total = currency(money1, { precision: 8 }).add(
    currency(money2, { precision: 8 })
  ).value;
  return currency(total, { precision: 2 }).value;
}
