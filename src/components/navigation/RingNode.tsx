import React, { useState } from 'react';

interface RingNodeProps {
  label: string;
  angle: number;
  radius: number;
  isActive?: boolean;
  onClick?: () => void;
  size?: 'default' | 'compact';
  onHoverChange?: (hovered: boolean) => void;
  isReady?: boolean;
  onBlockedClick?: () => void;
  isVisible?: boolean;
}

const RingNode: React.FC<RingNodeProps> = ({
  label,
  angle,
  radius,
  isActive = false,
  onClick,
  size = 'default',
  onHoverChange,
  isReady = true,
  onBlockedClick,
  isVisible = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  const dotSize = size === 'compact' ? 7.25 : 8.5;
  const fontSize = size === 'compact' ? '10.4px' : '12px';
  const labelOffset = size === 'compact' ? 18 : 24;

  const isCompact = size === 'compact';
  const isHomepageReady = !isCompact && isReady;
  const labelOpacity = isCompact || isHomepageReady ? 1 : 0;
  const accentSoft = 'rgb(var(--accent-blue-rgb) / 0.18)';
  const accentHover = 'rgb(var(--accent-blue-rgb) / 0.12)';
  const accentGlow = 'rgb(var(--accent-blue-rgb) / 0.16)';
  const accentGlowSoft = 'rgb(var(--accent-blue-rgb) / 0.08)';
  const accentStroke = 'rgb(var(--accent-glow-rgb) / 0.96)';
  const accentStrokeSoft = 'rgb(var(--accent-border-rgb) / 0.92)';
  const ringNodeCompactFill = 'rgb(var(--navy-700-rgb) / 0.96)';
  const ringNodeHomepageFill = 'rgb(var(--navy-400-rgb) / 0.56)';
  const ringNodeHomepageHoverFill = 'rgb(var(--navy-850-rgb) / 0.96)';
  const ringNodeInactiveFill = 'rgb(var(--navy-700-rgb) / 0.82)';
  const ringNodeLabel = 'rgb(var(--ring-muted-label-rgb) / 0.76)';
  const ringNodeLabelHover = 'rgb(var(--ring-label-rgb) / 0.96)';

  const nodeHaloFill = isActive
    ? accentSoft
    : isCompact
      ? isHovered
        ? accentHover
        : 'transparent'
      : isHomepageReady
        ? isHovered
          ? 'rgb(var(--accent-blue-rgb) / 0.05)'
          : 'rgb(var(--accent-blue-rgb) / 0.14)'
        : isHovered
          ? 'rgb(var(--accent-blue-rgb) / 0.04)'
          : 'transparent';

  const nodeFill = isActive
    ? 'rgb(var(--accent-blue-rgb) / 0.96)'
    : isCompact
      ? isHovered
        ? 'rgb(var(--accent-muted-rgb) / 0.92)'
        : ringNodeCompactFill
      : isHomepageReady
        ? isHovered
          ? ringNodeHomepageHoverFill
          : ringNodeHomepageFill
        : ringNodeInactiveFill;

  const nodeStroke = isActive
    ? accentStroke
    : isCompact
      ? isHovered
        ? accentStroke
        : accentStrokeSoft
      : isHomepageReady
        ? isHovered
          ? 'rgb(var(--ring-label-rgb) / 0.5)'
          : 'rgb(var(--accent-glow-rgb) / 0.72)'
        : 'rgb(var(--accent-muted-rgb) / 0.54)';

  const nodeGlowFill = isActive
    ? accentGlow
    : isCompact
      ? isHovered
        ? accentGlow
        : 'transparent'
      : isHomepageReady
        ? isHovered
          ? accentGlowSoft
          : accentHover
        : isHovered
          ? 'rgb(var(--accent-blue-rgb) / 0.05)'
          : 'transparent';

  const labelFill = isActive
    ? 'rgb(var(--accent-blue-rgb) / 0.98)'
    : isHovered
      ? ringNodeLabelHover
      : ringNodeLabel;

  const handleHover = (hovered: boolean) => {
    if (!isVisible) return;
    setIsHovered(hovered);
    onHoverChange?.(hovered);
  };

  const handleActivate = () => {
    if (!isVisible) return;

    if (!isReady && onBlockedClick) {
      onBlockedClick();
      return;
    }

    onClick?.();
  };

  return (
    <g
      className="cursor-pointer group"
      onClick={handleActivate}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      role="button"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      onKeyDown={(e) => {
        if (isVisible && (onClick || onBlockedClick) && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleActivate();
        }
      }}
    >
      <circle
        cx={x}
        cy={y}
        r={dotSize + (size === 'compact' ? 12 : 16)}
        fill="transparent"
      />

      <circle
        cx={x}
        cy={y}
        r={dotSize + (size === 'compact' ? 8 : 10)}
        className="transition-all duration-280"
        style={{ fill: nodeHaloFill }}
      />

      {/* Node dot */}
      <circle
        cx={x}
        cy={y}
        r={dotSize}
        className="transition-all duration-280"
        strokeWidth={isActive ? 2 : 1.6}
        style={{
          fill: nodeFill,
          stroke: nodeStroke,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      />

      {/* Glow effect */}
      <circle
        cx={x}
        cy={y}
        r={dotSize + 6}
        className="transition-all duration-280"
        style={{ fill: nodeGlowFill }}
      />

      {/* Label */}
      <text
        x={x + (x >= 0 ? labelOffset : -labelOffset)}
        y={y + 4}
        textAnchor={x >= 0 ? 'start' : 'end'}
        className="select-none transition-all duration-280 font-body"
        style={{
          fill: labelFill,
          fontSize,
          letterSpacing: '0.05em',
          fontWeight: isActive ? 500 : 450,
          opacity: labelOpacity,
        }}
      >
        {label}
      </text>
    </g>
  );
};

export default RingNode;
