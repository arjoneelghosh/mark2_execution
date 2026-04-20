import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/theme/theme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-button fixed bottom-4 left-4 z-[95] inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={15} className="text-accent-blue" /> : <Moon size={15} className="text-accent-blue" />}
      <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
};

export default ThemeToggle;
