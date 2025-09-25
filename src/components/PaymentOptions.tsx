import React from "react";

type PaymentMethod = "bit" | "paybox" | "cash";

export const PaymentOptions: React.FC<{ 
  onSelect(method: PaymentMethod): void;
  disabled?: boolean;
}> = ({ onSelect, disabled = false }) => {
  const handleSelect = (method: PaymentMethod) => {
    if (typeof onSelect === 'function' && !disabled) {
      try {
        onSelect(method);
      } catch (e) {
        console.error('Error in payment method selection:', e);
      }
    }
  };

  return (
    <div role="group" aria-label="Payment options">
      <button 
        onClick={() => handleSelect("bit")}
        disabled={disabled}
        aria-label="Pay with Bit"
      >
        Bit
      </button>
      <button 
        onClick={() => handleSelect("paybox")}
        disabled={disabled}
        aria-label="Pay with PayBox"
      >
        PayBox
      </button>
      <button 
        onClick={() => handleSelect("cash")}
        disabled={disabled}
        aria-label="Pay with cash"
      >
        Cash
      </button>
    </div>
  );
};
