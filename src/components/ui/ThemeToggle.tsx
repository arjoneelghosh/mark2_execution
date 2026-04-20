import React, { useId } from 'react';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '../../lib/theme/theme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const modeLabelArcId = useId();
  const currentModeLabel = isLight ? 'Light Mode' : 'Dark Mode';
  const nextModeLabel = isLight ? 'dark mode' : 'light mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-bulb-button fixed bottom-4 left-4 z-[95] inline-flex items-center ${
        isLight ? 'is-on' : 'is-off'
      }`}
      aria-label={`Theme switch. Current mode ${currentModeLabel}. Activate to switch to ${nextModeLabel}.`}
      aria-pressed={isLight}
      title={`${currentModeLabel}. Click to switch to ${nextModeLabel}.`}
    >
      <span className="theme-bulb-aura" aria-hidden="true" />
      <svg
        className="theme-bulb-ring"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          id={modeLabelArcId}
          className="theme-bulb-label-arc-path"
          d="M 17 50 A 33 33 0 0 1 83 50"
        />
        <text className="theme-bulb-ring-label">
          <textPath
            href={`#${modeLabelArcId}`}
            startOffset="50%"
            textAnchor="middle"
            lengthAdjust="spacingAndGlyphs"
            textLength="48"
          >
            {currentModeLabel.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <span className="theme-bulb-shell" aria-hidden="true">
        <span className="theme-bulb-rays" aria-hidden="true">
          <span className="theme-bulb-ray" />
          <span className="theme-bulb-ray" />
          <span className="theme-bulb-ray" />
          <span className="theme-bulb-ray" />
          <span className="theme-bulb-ray" />
          <span className="theme-bulb-ray" />
          <span className="theme-bulb-ray" />
        </span>
        <Lightbulb size={18} strokeWidth={1.85} className="theme-bulb-icon" />
        <span className="theme-bulb-filament" />
      </span>
    </button>
  );
};

export default ThemeToggle;
