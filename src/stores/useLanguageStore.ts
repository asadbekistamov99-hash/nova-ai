import { useState, useEffect } from 'react';
import en from '../locales/en.json';
import uz from '../locales/uz.json';
import ru from '../locales/ru.json';

export type Language = 'uz' | 'en' | 'ru';

const translations: Record<Language, any> = {
  uz,
  en,
  ru,
};

let currentLanguage: Language = 'en';
const listeners = new Set<(lang: Language) => void>();

export const getLanguage = (): Language => currentLanguage;

export const setLanguage = (lang: Language) => {
  if (currentLanguage !== lang) {
    currentLanguage = lang;
    localStorage.setItem('nova_language', lang);
    listeners.forEach((listener) => listener(lang));
  }
};

// Safe nested key lookup with placeholder interpolation
export const t = (path: string, params?: Record<string, string>): string => {
  const keys = path.split('.');
  let current: any = translations[currentLanguage];

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      // Fallback to English
      let fallback: any = translations.en;
      for (const fKey of keys) {
        if (fallback && typeof fallback === 'object' && fKey in fallback) {
          fallback = fallback[fKey];
        } else {
          return path;
        }
      }
      current = fallback;
      break;
    }
  }

  if (typeof current !== 'string') return path;

  if (params) {
    let result = current;
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
  }

  return current;
};

export const useLanguage = () => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('nova_language') as Language;
    return saved && ['uz', 'en', 'ru'].includes(saved) ? saved : 'en';
  });

  useEffect(() => {
    currentLanguage = lang;
    const listener = (newLang: Language) => setLangState(newLang);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    language: lang,
    setLanguage,
    t,
  };
};
