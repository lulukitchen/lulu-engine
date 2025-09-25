import React from "react";

export const WhatsAppButton: React.FC<{ 
  onClick(): void;
  disabled?: boolean;
  children?: React.ReactNode;
}> = ({ onClick, disabled = false, children = "WhatsApp" }) => {
  const handleClick = () => {
    if (typeof onClick === 'function' && !disabled) {
      try {
        onClick();
      } catch (e) {
        console.error('Error in WhatsApp button click handler:', e);
      }
    }
  };

  return (
    <button 
      type="button"
      aria-label="Send via WhatsApp" 
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
