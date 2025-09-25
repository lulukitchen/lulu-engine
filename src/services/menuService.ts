import type { MenuItem } from "../types";

export async function fetchMenu(csvUrl: string): Promise<MenuItem[]> {
  const res = await fetch(csvUrl, { cache: "no-store" });
  const text = await res.text();
  // Simple CSV parsing (expects header line). Replace with Papa.parse in consumer if needed.
  const [header, ...rows] = text.trim().split(/\r?\n/);
  const cols = header.split(",").map(s=>s.trim());
  const idx = (k: string) => cols.indexOf(k);
  return rows.map(line => {
    const parts = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); // naive CSV split
    const get = (k: string) => parts[idx(k)]?.replace(/^"|"$/g,"");
    const price = Number(get("price") || 0);
    const tags = (get("tags")||"").split(",").map(s=>s.trim()).filter(Boolean);
    let addons: any = undefined;
    const rawAddons = get("addons");
    if (rawAddons) { try { addons = JSON.parse(rawAddons); } catch { addons = undefined; } }
    return {
      id: get("id"),
      category: get("category") || "",
      name_he: get("name_he") || "",
      name_en: get("name_en") || "",
      description_he: get("description_he") || "",
      description_en: get("description_en") || "",
      price,
      image_url: get("image_url") || undefined,
      tags,
      addons,
      available: get("available") === "1"
    } as MenuItem;
  });
}
