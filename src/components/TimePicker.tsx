import React from "react";

export const TimePicker: React.FC<{ 
  slots: string[]; 
  onPick(v: string): void;
  placeholder?: string;
}> = ({ slots, onPick, placeholder = "Select time..." }) => {
  if (!Array.isArray(slots)) {
    console.error('TimePicker: slots must be an array');
    return <select disabled><option>{placeholder}</option></select>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && typeof onPick === 'function') {
      onPick(value);
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="">{placeholder}</option>
      {slots.map(slot => {
        if (!slot || typeof slot !== 'string') {
          console.warn('Invalid slot value:', slot);
          return null;
        }
        
        try {
          const date = new Date(slot);
          if (isNaN(date.getTime())) {
            console.warn('Invalid date slot:', slot);
            return null;
          }
          
          return (
            <option key={slot} value={slot}>
              {date.toLocaleString()}
            </option>
          );
        } catch (e) {
          console.warn('Error parsing slot date:', slot, e);
          return null;
        }
      })}
    </select>
  );
};
