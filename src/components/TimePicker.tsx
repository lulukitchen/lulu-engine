import React from "react";
export const TimePicker: React.FC<{ slots: string[]; onPick(v: string): void }> = ({ slots, onPick }) => {
  return (
    <select onChange={(e)=>onPick(e.target.value)}>
      <option value="">--</option>
      {slots.map(s=> <option key={s} value={s}>{new Date(s).toLocaleString()}</option>)}
    </select>
  );
};
