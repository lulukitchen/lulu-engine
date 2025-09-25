export function isOpenNow(biz: Record<string, {open:string; close:string}[]>, when = new Date(), tz = "Asia/Jerusalem"): boolean {
  // Simplified: assumes local TZ already. Implementors can swap to luxon later.
  const day = ["sun","mon","tue","wed","thu","fri","sat"][when.getDay()];
  const ranges = biz[day] || [];
  const toMins = (s:string)=>{const [h,m]=s.split(":").map(Number); return h*60+m;};
  const m = when.getHours()*60+when.getMinutes();
  return ranges.some(r => m >= toMins(r.open) && m <= toMins(r.close));
}

export function nextValidSlots(biz: Record<string, {open:string; close:string}[]>, step=30, count=10, from=new Date()) {
  const slots: string[] = [];
  const d = new Date(from);
  for (let i=0;i<24*4;i++){ // up to 24h lookahead
    const mins = d.getMinutes();
    const rounded = mins % step === 0 ? d : new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), mins + (step - (mins % step)));
    d.setTime(rounded.getTime());
    if (isOpenNow(biz, d)) slots.push(rounded.toISOString());
    d.setMinutes(d.getMinutes() + step);
    if (slots.length>=count) break;
  }
  return slots;
}
