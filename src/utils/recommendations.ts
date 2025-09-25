import type { MenuItem, CartItem } from "../types";
export function getRecommendations(menu: MenuItem[], cart: CartItem[], limit=6): MenuItem[] {
  const inCart = new Set(cart.map(c=>c.id));
  const pool = menu.filter(m=>!inCart.has(m.id));
  return pool.slice(0, limit);
}
