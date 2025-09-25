import type { Order } from "../types";

export function buildWhatsAppMessage(order: Order): string {
  if (!order || !order.id) {
    throw new Error('Invalid order: missing order ID');
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    throw new Error('Invalid order: no items found');
  }

  const lines: string[] = [];
  lines.push(`Order #${order.id}`);
  
  order.items.forEach(item => {
    if (!item || !item.id || typeof item.qty !== 'number' || typeof item.total !== 'number') {
      console.warn('Skipping invalid item in order:', item);
      return;
    }
    lines.push(`- ${item.id} x${item.qty} = ${item.total}₪`);
  });
  
  lines.push(`Total: ${order.total}₪`);
  lines.push(`Payment: ${order.paymentMethod}`);
  
  if (order.scheduledAt) {
    lines.push(`Scheduled: ${new Date(order.scheduledAt).toLocaleString()}`);
  }
  
  if (order.customer?.name || order.customer?.phone) {
    lines.push(`Customer: ${order.customer.name || 'N/A'} (${order.customer.phone || 'N/A'})`);
  }
  
  return lines.join("\n");
}

export function openWhatsApp(numberIntl: string, text: string): void {
  if (!numberIntl || typeof numberIntl !== 'string') {
    throw new Error('Invalid WhatsApp number provided');
  }

  if (!text || typeof text !== 'string') {
    throw new Error('Invalid message text provided');
  }

  // Validate international number format (simple validation)
  const cleanNumber = numberIntl.replace(/\D/g, '');
  if (cleanNumber.length < 10 || cleanNumber.length > 15) {
    throw new Error('Invalid international phone number format');
  }

  try {
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  } catch (e) {
    console.error('Failed to open WhatsApp:', e);
    throw new Error('Failed to open WhatsApp');
  }
}
