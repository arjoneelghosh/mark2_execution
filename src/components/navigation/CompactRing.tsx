import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RingNode from './RingNode';

const NAV_ITEMS = [
  { label: 'Projects', path: '/work', angle: -90 },
  { label: 'Profile', path: '/profile', angle: -30 },
  { label: 'Experience', path: '/experience', angle: 30 },
  { label: 'Connect', path: '/connect', angle: 90 },
  { label: 'Ask', path: '/ask', angle: 150 },
  { label: 'Lab', path: '/lab', angle: 210 },
];

const CompactRing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRingHovered, setIsRingHovered] = useState(false);
  const ringRadius = 84;
  const isRingVisible = isRingHovered;
  const ringScale = isRingVisible ? 1.16 : 1.04;
  const accentField = 'rgb(var(--accent-blue-rgb) / var(--compact-ring-field-opacity))';
  const accentHalo = 'rgb(var(--accent-glow-rgb) / var(--compact-ring-halo-opacity))';
  const accentHaloOuter = 'rgb(var(--accent-blue-rgb) / var(--compact-ring-halo-outer-opacity))';
  const ringStroke = 'rgb(var(--accent-blue-rgb) / var(--compact-ring-stroke-opacity))';
  const coreGlow = 'rgb(var(--accent-blue-rgb) / var(--compact-ring-core-glow-opacity))';
  const coreFill = 'rgb(var(--ring-core-fill-rgb) / var(--compact-ring-core-fill-opacity))';
  const coreStroke = 'rgb(var(--ring-core-stroke-rgb) / var(--compact-ring-core-stroke-opacity))';

  useEffect(() => {
    setIsRingHovered(false);
  }, [location.pathname]);

  return (
    <div className="fixed top-7 right-7 z-40 w-[216px] h-[216px]">
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-280 ease-out"
        style={{ transform: `scale(${ringScale})`, transformOrigin: 'center' }}
        onMouseEnter={() => setIsRingHovered(true)}
        onMouseLeave={() => setIsRingHovered(false)}
      >
        {/* Ambient pulse field */}
        <div
          className="compact-ring-pulse absolute w-[216px] h-[216px] rounded-full transition-all duration-280 ease-out"
          style={{
            background: `radial-gradient(circle, ${accentField} 0%, transparent 70%)`,
            filter: 'blur(26px)',
            opacity: isRingVisible ? 1 : 0,
            transform: `scale(${isRingVisible ? 1 : 0.9})`,
          }}
        />
        <div
          className="compact-ring-pulse-halo absolute w-[180px] h-[180px] rounded-full transition-all duration-280 ease-out"
          style={{
            background: `radial-gradient(circle, ${accentHalo} 0%, ${accentHaloOuter} 42%, transparent 74%)`,
            filter: 'blur(18px)',
            opacity: isRingVisible ? 1 : 0,
            transform: `scale(${isRingVisible ? 1 : 0.9})`,
          }}
        />

        <svg
          viewBox="-130 -130 260 260"
          className="w-[216px] h-[216px] relative z-10"
          style={{ overflow: 'visible' }}
        >
          <circle
            cx={0}
            cy={0}
            r={isRingVisible ? 34 : 54}
            fill={coreGlow}
            className="compact-ring-core-glow transition-all duration-300"
          />

          <g
            className="transition-all duration-280 ease-out"
            style={{
              opacity: isRingVisible ? 1 : 0,
              transform: `scale(${isRingVisible ? 1 : 0.92})`,
              transformOrigin: 'center',
              pointerEvents: isRingVisible ? 'auto' : 'none',
            }}
          >
            {/* Ring */}
            <circle
              cx={0}
              cy={0}
              r={ringRadius}
              fill="none"
              stroke={ringStroke}
              strokeWidth={1.1}
            />

            {/* Navigation nodes */}
            {NAV_ITEMS.map((item) => (
              <RingNode
                key={item.path}
                label={item.label}
                angle={item.angle}
                radius={ringRadius}
                isActive={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                size="compact"
                isVisible={isRingVisible}
              />
            ))}
          </g>

          {/* Center node */}
          <g
            className="cursor-pointer group"
            onClick={() => navigate('/')}
            onMouseEnter={() => setIsRingHovered(true)}
            onFocus={() => setIsRingHovered(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/');
              }
            }}
            aria-label="Home"
          >
            <circle
              cx={0}
              cy={0}
              r={isRingVisible ? 24 : 40}
              fill={coreFill}
              stroke={coreStroke}
              strokeWidth={1}
              className="compact-ring-core transition-all duration-300"
            />
            <text
              x={isRingVisible ? 0 : 1}
              y={isRingVisible ? 4 : 12}
              textAnchor="middle"
              className="select-none fill-[rgb(var(--ring-label-rgb))] transition-all duration-300 group-hover:fill-accent-blue"
              style={{
                fontSize: isRingVisible ? '11.5px' : '35px',
                letterSpacing: isRingVisible ? '0.12em' : '0.04em',
                fontWeight: isRingVisible ? 600 : 500,
              }}
            >
              {isRingVisible ? 'Home' : 'AG'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CompactRing;
