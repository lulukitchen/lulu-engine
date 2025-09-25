import type { MenuItem, AddonGroup } from "../types";

export class MenuParsingError extends Error {
  constructor(message: string, public readonly line?: number) {
    super(message);
    this.name = 'MenuParsingError';
  }
}

function isValidAddonGroup(obj: any): obj is AddonGroup {
  return obj && typeof obj === 'object' && 
    typeof obj.id === 'string' &&
    typeof obj.label === 'string' &&
    (obj.type === 'single' || obj.type === 'multi') &&
    Array.isArray(obj.options);
}

export async function fetchMenu(csvUrl: string): Promise<MenuItem[]> {
  if (!csvUrl || typeof csvUrl !== 'string') {
    throw new MenuParsingError('Invalid CSV URL provided');
  }

  try {
    const res = await fetch(csvUrl, { cache: "no-store" });
    if (!res.ok) {
      throw new MenuParsingError(`Failed to fetch menu: ${res.status} ${res.statusText}`);
    }
    
    const text = await res.text();
    if (!text.trim()) {
      throw new MenuParsingError('Empty CSV file received');
    }

    // Simple CSV parsing (expects header line). Replace with Papa.parse in consumer if needed.
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) {
      throw new MenuParsingError('CSV must contain at least a header row and one data row');
    }

    const [header, ...rows] = lines;
    const cols = header.split(",").map(s=>s.trim());
    const idx = (k: string) => cols.indexOf(k);
    
    // Validate required columns
    const requiredColumns = ['id', 'name_he', 'name_en', 'price'];
    const missingColumns = requiredColumns.filter(col => idx(col) === -1);
    if (missingColumns.length > 0) {
      throw new MenuParsingError(`Missing required columns: ${missingColumns.join(', ')}`);
    }

    return rows.map((line, lineIndex) => {
      try {
        const parts = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); // naive CSV split
        const get = (k: string) => {
          const colIndex = idx(k);
          if (colIndex === -1) return undefined;
          return parts[colIndex]?.replace(/^"|"$/g,"") || undefined;
        };
        
        const id = get("id");
        if (!id) {
          throw new MenuParsingError(`Missing required field 'id'`, lineIndex + 2);
        }

        const priceStr = get("price");
        const price = Number(priceStr || 0);
        if (isNaN(price) || price < 0) {
          throw new MenuParsingError(`Invalid price '${priceStr}' for item '${id}'`, lineIndex + 2);
        }

        const tags = (get("tags")||"").split(",").map(s=>s.trim()).filter(Boolean);
        let addons: AddonGroup[] | undefined = undefined;
        const rawAddons = get("addons");
        if (rawAddons) {
          try {
            const parsed = JSON.parse(rawAddons);
            if (Array.isArray(parsed)) {
              const validAddons = parsed.filter(isValidAddonGroup);
              if (validAddons.length !== parsed.length) {
                console.warn(`Some addon groups for item '${id}' are invalid and were filtered out`);
              }
              addons = validAddons;
            }
          } catch (e) {
            console.warn(`Failed to parse addons for item '${id}':`, e);
            addons = undefined;
          }
        }
        
        return {
          id,
          category: get("category") || "",
          name_he: get("name_he") || "",
          name_en: get("name_en") || "",
          description_he: get("description_he"),
          description_en: get("description_en"),
          price,
          image_url: get("image_url"),
          tags,
          addons,
          available: get("available") !== "0" // Default to available unless explicitly set to "0"
        } as MenuItem;
      } catch (e) {
        if (e instanceof MenuParsingError) {
          throw e;
        }
        throw new MenuParsingError(`Error parsing line ${lineIndex + 2}: ${e instanceof Error ? e.message : 'Unknown error'}`, lineIndex + 2);
      }
    });
  } catch (e) {
    if (e instanceof MenuParsingError) {
      throw e;
    }
    throw new MenuParsingError(`Network or parsing error: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
}
