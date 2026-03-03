import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'en' | 'vi';

// Get initial language from localStorage or default to 'en'
const getInitialLanguage = (): Language => {
  if (browser) {
    const stored = localStorage.getItem('pocketvault-language');
    if (stored === 'vi' || stored === 'en') {
      return stored;
    }
  }
  return 'en';
};

// Create language store
function createLanguageStore() {
  const { subscribe, set } = writable<Language>(getInitialLanguage());

  return {
    subscribe,
    set: (lang: Language) => {
      if (browser) {
        localStorage.setItem('pocketvault-language', lang);
      }
      set(lang);
    },
    toggle: () => {
      const current = getInitialLanguage();
      const newLang = current === 'en' ? 'vi' : 'en';
      if (browser) {
        localStorage.setItem('pocketvault-language', newLang);
      }
      set(newLang);
    }
  };
}

export const language = createLanguageStore();
