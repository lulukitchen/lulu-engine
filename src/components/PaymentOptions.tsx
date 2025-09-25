import React from "react";
export const PaymentOptions: React.FC<{ onSelect(m: "bit"|"paybox"|"cash"): void }> = ({ onSelect }) => {
  return (
    <div>
      <button onClick={()=>onSelect("bit")}>Bit</button>
      <button onClick={()=>onSelect("paybox")}>PayBox</button>
      <button onClick={()=>onSelect("cash")}>Cash</button>
    </div>
  );
};
