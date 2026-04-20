import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '../../lib/theme/theme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-bulb-button fixed bottom-4 left-4 z-[95] inline-flex items-center ${
        isLight ? 'is-on' : 'is-off'
      }`}
      aria-label={isLight ? 'Theme switch, light mode on. Switch to dark mode.' : 'Theme switch, dark mode on. Switch to light mode.'}
      aria-pressed={isLight}
      title={isLight ? 'Light mode on' : 'Dark mode on'}
    >
      <span className="theme-bulb-aura" aria-hidden="true" />
      <span className="theme-bulb-shell" aria-hidden="true">
        <Lightbulb size={18} strokeWidth={1.85} className="theme-bulb-icon" />
        <span className="theme-bulb-filament" />
      </span>
      <span className="theme-bulb-state" aria-hidden="true">
        {isLight ? 'ON' : 'OFF'}
      </span>
    </button>
  );
};

export default ThemeToggle;
