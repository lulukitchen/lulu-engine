import React from "react";
export const MenuItemModal: React.FC<{ open: boolean; onClose(): void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>MenuItemModal (skeleton)</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
