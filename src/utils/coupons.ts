export function applyCoupons(
  subtotal: number, 
  code?: string, 
  isFirstPurchase?: boolean, 
  isReturning?: boolean
): number {
  if (typeof subtotal !== 'number' || isNaN(subtotal) || subtotal < 0) {
    console.error('Invalid subtotal provided:', subtotal);
    return 0;
  }

  let discount = 0;
  
  try {
    if (isFirstPurchase === true) {
      discount += subtotal * 0.10; // FIRST10 - 10% off
    }
    
    if (isReturning === true) {
      discount += subtotal * 0.05; // Returning customer - 5% off
    }
    
    if (code && typeof code === 'string') {
      const upperCode = code.trim().toUpperCase();
      switch (upperCode) {
        case "WELCOME20":
          discount += 20; // Fixed 20₪ discount
          break;
        case "SAVE15":
          discount += 15; // Fixed 15₪ discount
          break;
        default:
          console.warn('Unknown coupon code:', code);
          break;
      }
    }
    
    // Ensure discount doesn't exceed subtotal
    return Math.min(discount, subtotal);
  } catch (e) {
    console.error('Error applying coupons:', e);
    return 0;
  }
}
