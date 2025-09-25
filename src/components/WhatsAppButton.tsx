import React from "react";
export const WhatsAppButton: React.FC<{ onClick(): void }> = ({ onClick }) => {
  return <button aria-label="WhatsApp" onClick={onClick}>WhatsApp</button>;
};
