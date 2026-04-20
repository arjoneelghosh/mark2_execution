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

  const nodeHaloFill = isActive
    ? 'rgba(74, 144, 217, 0.18)'
    : isCompact
      ? isHovered
        ? 'rgba(74, 144, 217, 0.12)'
        : 'transparent'
      : isHomepageReady
        ? isHovered
          ? 'rgba(74, 144, 217, 0.05)'
          : 'rgba(74, 144, 217, 0.14)'
        : isHovered
          ? 'rgba(74, 144, 217, 0.04)'
          : 'transparent';

  const nodeFill = isActive
    ? 'rgba(74, 144, 217, 0.96)'
    : isCompact
      ? isHovered
        ? 'rgba(42, 90, 154, 0.92)'
        : 'rgba(22, 37, 80, 0.96)'
      : isHomepageReady
        ? isHovered
          ? 'rgba(13, 22, 48, 0.96)'
          : 'rgba(58, 95, 160, 0.56)'
        : 'rgba(22, 37, 80, 0.82)';

  const nodeStroke = isActive
    ? 'rgba(91, 160, 232, 0.96)'
    : isCompact
      ? isHovered
        ? 'rgba(91, 160, 232, 0.92)'
        : 'rgba(39, 69, 128, 0.92)'
      : isHomepageReady
        ? isHovered
          ? 'rgba(184, 208, 240, 0.5)'
          : 'rgba(91, 160, 232, 0.72)'
        : 'rgba(42, 90, 154, 0.54)';

  const nodeGlowFill = isActive
    ? 'rgba(74, 144, 217, 0.16)'
    : isCompact
      ? isHovered
        ? 'rgba(74, 144, 217, 0.14)'
        : 'transparent'
      : isHomepageReady
        ? isHovered
          ? 'rgba(74, 144, 217, 0.08)'
          : 'rgba(74, 144, 217, 0.12)'
        : isHovered
          ? 'rgba(74, 144, 217, 0.05)'
          : 'transparent';

  const labelFill = isActive
    ? 'rgba(74, 144, 217, 0.98)'
    : isHovered
      ? 'rgba(224, 236, 255, 0.96)'
      : 'rgba(138, 170, 224, 0.76)';

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
