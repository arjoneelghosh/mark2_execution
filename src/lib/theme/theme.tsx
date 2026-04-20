import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type SiteTheme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'mark2-site-theme';
const THEME_ATTRIBUTE = 'data-theme';

const isSiteTheme = (value: string | null): value is SiteTheme =>
  value === 'dark' || value === 'light';

const getStoredTheme = (): SiteTheme | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isSiteTheme(stored) ? stored : null;
  } catch {
    return null;
  }
};

const resolveInitialTheme = (): SiteTheme => {
  if (typeof document === 'undefined') return 'dark';

  const stored = getStoredTheme();
  if (stored) return stored;

  const attrTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isSiteTheme(attrTheme) ? attrTheme : 'dark';
};

const applyTheme = (theme: SiteTheme) => {
  if (typeof document === 'undefined') return;

  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  document.documentElement.style.colorScheme = theme;
};

export const initializeTheme = () => {
  applyTheme(resolveInitialTheme());
};

interface ThemeContextValue {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<SiteTheme>(() => resolveInitialTheme());

  useEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures and keep the runtime theme applied.
    }
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
