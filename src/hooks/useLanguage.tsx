import { useState, useEffect, useCallback } from "react";
import type { Lang } from "../types";

const KEY = "lulu:lang";

function isValidLang(value: any): value is Lang {
  return value === "he" || value === "en";
}

function safeGetStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored && isValidLang(stored)) {
      return stored;
    }
  } catch (e) {
    console.error('Error reading language from localStorage:', e);
  }
  return "he"; // Default fallback
}

function safeSetStoredLang(lang: Lang): void {
  try {
    localStorage.setItem(KEY, lang);
  } catch (e) {
    console.error('Error saving language to localStorage:', e);
  }
}

function applyDir(lang: Lang) {
  try {
    const dir = lang === "he" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  } catch (e) {
    console.error('Error applying language direction:', e);
  }
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(safeGetStoredLang);
  
  useEffect(() => {
    applyDir(lang);
    safeSetStoredLang(lang);
  }, [lang]);
  
  const setLangSafe = useCallback((newLang: Lang) => {
    if (isValidLang(newLang)) {
      setLang(newLang);
    } else {
      console.error('Invalid language provided:', newLang);
    }
  }, []);
  
  const toggleLanguage = useCallback(() => {
    setLang(currentLang => currentLang === "he" ? "en" : "he");
  }, []);
  
  return { 
    lang, 
    setLang: setLangSafe, 
    toggleLanguage, 
    dir: lang === "he" ? "rtl" : "ltr" 
  };
}
