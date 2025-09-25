import type { BusinessHours } from "../types";

function isValidTimeString(timeStr: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeStr);
}

function validateBusinessHours(biz: BusinessHours): void {
  const validDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  
  for (const [day, ranges] of Object.entries(biz)) {
    if (!validDays.includes(day)) {
      throw new Error(`Invalid day: ${day}. Must be one of: ${validDays.join(', ')}`);
    }
    
    if (!Array.isArray(ranges)) {
      throw new Error(`Business hours for ${day} must be an array`);
    }
    
    for (const range of ranges) {
      if (!range || typeof range !== 'object') {
        throw new Error(`Invalid range for ${day}: must be an object with 'open' and 'close' properties`);
      }
      
      if (!range.open || !range.close) {
        throw new Error(`Missing open or close time for ${day}`);
      }
      
      if (!isValidTimeString(range.open)) {
        throw new Error(`Invalid open time for ${day}: ${range.open}. Must be in HH:MM format`);
      }
      
      if (!isValidTimeString(range.close)) {
        throw new Error(`Invalid close time for ${day}: ${range.close}. Must be in HH:MM format`);
      }
    }
  }
}

export function isOpenNow(biz: BusinessHours, when = new Date(), tz = "Asia/Jerusalem"): boolean {
  try {
    validateBusinessHours(biz);
  } catch (e) {
    console.error('Invalid business hours configuration:', e);
    return false; // Fail safe - assume closed if configuration is invalid
  }

  // Simplified: assumes local TZ already. Implementors can swap to luxon later.
  const day = ["sun","mon","tue","wed","thu","fri","sat"][when.getDay()];
  const ranges = biz[day] || [];
  
  const toMins = (s: string): number => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };
  
  const currentMins = when.getHours() * 60 + when.getMinutes();
  
  return ranges.some(r => {
    const openMins = toMins(r.open);
    const closeMins = toMins(r.close);
    
    // Handle overnight hours (e.g., 22:00-02:00)
    if (closeMins < openMins) {
      return currentMins >= openMins || currentMins <= closeMins;
    }
    
    return currentMins >= openMins && currentMins <= closeMins;
  });
}

export function nextValidSlots(biz: BusinessHours, step = 30, count = 10, from = new Date()): string[] {
  if (step <= 0 || step > 60) {
    throw new Error('Step must be between 1 and 60 minutes');
  }
  
  if (count <= 0 || count > 100) {
    throw new Error('Count must be between 1 and 100');
  }

  try {
    validateBusinessHours(biz);
  } catch (e) {
    console.error('Invalid business hours configuration:', e);
    return []; // Return empty array if configuration is invalid
  }

  const slots: string[] = [];
  const d = new Date(from);
  const maxIterations = 24 * 7 * (60 / step); // One week worth of slots
  
  for (let i = 0; i < maxIterations && slots.length < count; i++) {
    const mins = d.getMinutes();
    const rounded = mins % step === 0 ? 
      new Date(d) : 
      new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), mins + (step - (mins % step)));
    
    if (isOpenNow(biz, rounded)) {
      slots.push(rounded.toISOString());
    }
    
    d.setMinutes(d.getMinutes() + step);
  }
  
  return slots;
}
