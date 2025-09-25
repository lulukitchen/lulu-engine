import { useState, useEffect, useCallback } from "react";
import type { Lang } from "../types";

const KEY = "lulu:lang";

function applyDir(lang: Lang) {
  const dir = lang === "he" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem(KEY) as Lang) || "he");
  useEffect(() => {
    applyDir(lang);
    localStorage.setItem(KEY, lang);
  }, [lang]);
  const toggleLanguage = useCallback(() => setLang(l => (l === "he" ? "en" : "he")), []);
  return { lang, setLang, toggleLanguage, dir: lang === "he" ? "rtl" : "ltr" };
}
