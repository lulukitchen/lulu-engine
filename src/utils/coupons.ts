import type { CartItem } from "../types";
export function applyCoupons(subtotal: number, code?: string, isFirstPurchase?: boolean, isReturning?: boolean): number {
  let discount = 0;
  if (isFirstPurchase) discount += subtotal * 0.10; // FIRST10
  if (isReturning) discount += subtotal * 0.05;
  if (code === "WELCOME20") discount += 20;
  if (code === "SAVE15") discount += 15;
  return Math.min(discount, subtotal);
}
