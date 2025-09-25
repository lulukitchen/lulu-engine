export type Lang = "he" | "en";

export type AddonOption = { label: string; price?: number };
export type AddonGroup = {
  id: string;
  label: string;
  type: "single" | "multi";
  required?: boolean;
  options: AddonOption[];
};

export type MenuItem = {
  id: string;
  category: string;
  name_he: string;
  name_en: string;
  description_he?: string;
  description_en?: string;
  price: number;
  image_url?: string;
  tags?: string[];
  addons?: AddonGroup[];
  available?: boolean;
};

export type CartItem = {
  id: string;
  qty: number;
  note?: string;
  addons?: { groupId: string; options: string[] }[];
  unitPrice: number;
  total: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount?: number;
  delivery?: number;
  total: number;
  paymentMethod: "bit" | "paybox" | "cash";
  scheduledAt?: string;
  customer?: { name?: string; phone?: string; address?: string };
};

export type BusinessHours = Record<string, { open: string; close: string }[]>;
