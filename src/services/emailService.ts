import type { Order } from "../types";

export type EmailSender = (order: Order) => Promise<{ ok: boolean; id?: string; error?: string }>;
export function createEmailService(endpoint: string): EmailSender {
  return async (order) => {
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) });
      if (!res.ok) return { ok: false, error: await res.text() };
      const data = await res.json().catch(()=>({}));
      return { ok: true, id: data.id };
    } catch (e: any) {
      return { ok: false, error: e?.message || "network_error" };
    }
  };
}
