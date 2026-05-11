import { create } from 'zustand';

export type Theme = 'theme-dark-zinc' | 'theme-dark-blue' | 'theme-dark-purple' | 'theme-dark-teal' | 'theme-dark-rose' | 'theme-dark-amber';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'theme-dark-zinc',
  setTheme: (theme) => {
    // 1. Update document class
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.classList.remove(
        'theme-dark-zinc', 'theme-dark-blue', 'theme-dark-purple', 
        'theme-dark-teal', 'theme-dark-rose', 'theme-dark-amber'
      );
      html.classList.add(theme);
    }
    // 2. Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('gh-theme', theme);
    }
    // 3. Update Zustand state
    set({ theme });
  },
  initTheme: () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('gh-theme') as Theme | null;
      if (savedTheme) {
        set({ theme: savedTheme });
      }
    }
  }
}));
