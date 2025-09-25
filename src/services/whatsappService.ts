import type { Order } from "../types";

export function buildWhatsAppMessage(order: Order): string {
  const lines: string[] = [];
  lines.push(`Order #${order.id}`);
  order.items.forEach(i => {
    lines.push(`- ${i.id} x${i.qty} = ${i.total}₪`);
  });
  lines.push(`Total: ${order.total}₪`);
  lines.push(`Payment: ${order.paymentMethod}`);
  return lines.join("\n");
}

export function openWhatsApp(numberIntl: string, text: string) {
  const url = `https://wa.me/${numberIntl}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}
