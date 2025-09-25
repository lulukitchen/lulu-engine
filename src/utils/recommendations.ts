import type { MenuItem, CartItem } from "../types";

export function getRecommendations(menu: MenuItem[], cart: CartItem[], limit = 6): MenuItem[] {
  if (!Array.isArray(menu)) {
    console.error('Invalid menu provided to getRecommendations');
    return [];
  }

  if (!Array.isArray(cart)) {
    console.error('Invalid cart provided to getRecommendations');
    return [];
  }

  if (typeof limit !== 'number' || limit <= 0 || limit > 50) {
    console.warn('Invalid limit provided, using default of 6');
    limit = 6;
  }

  try {
    const inCart = new Set(cart.map(c => c.id).filter(id => typeof id === 'string'));
    const pool = menu.filter(item => 
      item && 
      typeof item.id === 'string' && 
      !inCart.has(item.id) &&
      item.available !== false
    );
    
    return pool.slice(0, limit);
  } catch (e) {
    console.error('Error generating recommendations:', e);
    return [];
  }
}
