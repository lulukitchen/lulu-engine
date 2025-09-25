import { useEffect, useMemo, useState } from "react";
import type { CartItem } from "../types";

const KEY = "lulu:cart";

function safeLocalStorageGet(key: string, defaultValue: CartItem[]): CartItem[] {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;
    
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      console.warn('Invalid cart data in localStorage, resetting to empty cart');
      return defaultValue;
    }
    
    // Validate cart items structure
    const validItems = parsed.filter(item => 
      item && 
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.qty === 'number' &&
      typeof item.unitPrice === 'number' &&
      typeof item.total === 'number' &&
      item.qty > 0 &&
      item.unitPrice >= 0 &&
      item.total >= 0
    );
    
    if (validItems.length !== parsed.length) {
      console.warn('Some cart items were invalid and filtered out');
    }
    
    return validItems;
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
    return defaultValue;
  }
}

function safeLocalStorageSet(key: string, value: CartItem[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving cart to localStorage:', e);
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => safeLocalStorageGet(KEY, []));
  
  useEffect(() => {
    safeLocalStorageSet(KEY, items);
  }, [items]);
  
  const subtotal = useMemo(() => 
    items.reduce((sum, item) => sum + item.total, 0), 
    [items]
  );
  
  function add(item: CartItem) {
    if (!item || typeof item !== 'object' || !item.id || item.qty <= 0) {
      console.error('Invalid cart item provided to add:', item);
      return;
    }
    setItems(prev => [...prev, item]);
  }
  
  function remove(id: string) {
    if (!id || typeof id !== 'string') {
      console.error('Invalid item id provided to remove:', id);
      return;
    }
    setItems(prev => prev.filter(i => i.id !== id));
  }
  
  function clear() {
    setItems([]);
  }
  
  return { items, subtotal, add, remove, clear, setItems };
}
