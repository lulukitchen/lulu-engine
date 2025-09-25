import { useEffect, useMemo, useState } from "react";
import type { CartItem } from "../types";

const KEY = "lulu:cart";
export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  const subtotal = useMemo(() => items.reduce((s,i)=>s+i.total,0), [items]);
  function add(item: CartItem){ setItems(prev=>[...prev,item]); }
  function remove(id: string){ setItems(prev=>prev.filter(i=>i.id!==id)); }
  function clear(){ setItems([]); }
  return { items, subtotal, add, remove, clear, setItems };
}
