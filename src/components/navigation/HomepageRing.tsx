import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RingNode from './RingNode';

const NAV_ITEMS = [
  { label: 'Projects', path: '/work', angle: -90 },
  { label: 'Profile', path: '/profile', angle: -30 },
  { label: 'Experience', path: '/experience', angle: 30 },
  { label: 'Connect', path: '/connect', angle: 90 },
  { label: 'Ask', path: '/ask', angle: 150 },
  { label: 'Lab', path: '/lab', angle: 210 },
];

interface HomepageRingProps {
  scrollProgress?: number; // 0 to 1
  isActive?: boolean;
}

const HomepageRing: React.FC<HomepageRingProps> = ({ scrollProgress = 0, isActive = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNodeHovered, setIsNodeHovered] = useState(false);

  const ringRadius = 108;
  const glowOpacity = 0.15 + scrollProgress * 0.25;
  const centerTextOpacity = isActive
    ? 1
    : Math.min(Math.max((scrollProgress - 0.18) / 0.7, 0), 1) * 0.68;
  const revealStrength = Math.min(Math.max((scrollProgress - 0.04) / 0.96, 0), 1);
  const activeBoost = isActive ? 1 : 0;
  const hoverBoost = isNodeHovered ? 1 : 0;
  const innerHaloOpacity = 0.03 + revealStrength * 0.07 + activeBoost * 0.05 + hoverBoost * 0.04;
  const innerFillOpacity = 0.08 + revealStrength * 0.1 + activeBoost * 0.1 + hoverBoost * 0.04;
  const innerCoreStrokeOpacity = 0.12 + revealStrength * 0.14 + activeBoost * 0.08 + hoverBoost * 0.05;
  const innerOrbitStrokeOpacity = 0.05 + revealStrength * 0.13 + activeBoost * 0.08 + hoverBoost * 0.04;
  const innerBloomOpacity = revealStrength * 0.035 + activeBoost * 0.045 + hoverBoost * 0.025;
  const handleBlockedRingPress = () => {
    window.alert('Scroll Down to use the Navigation Ring');
  };

  return (
    <div className="relative flex items-center justify-center">

      {/* Ambient glow behind ring */}
      <div
        className="absolute w-[364px] h-[364px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(74,144,217,${glowOpacity}) 0%, transparent 70%)`,
          filter: 'blur(46px)',
        }}
      />

      <svg
        viewBox="-205 -205 410 410"
        className="w-[364px] h-[364px] relative z-10"
        style={{ overflow: 'visible' }}
      >
        {/* Main ring circle */}
        <circle
          cx={0}
          cy={0}
          r={ringRadius}
          fill="none"
          stroke="rgba(74, 144, 217, 0.12)"
          strokeWidth={1.5}
          className="animate-ring-breathe"
        />

        {/* Outer decorative ring */}
        <circle
          cx={0}
          cy={0}
          r={ringRadius + 15}
          fill="none"
          stroke="rgba(74, 144, 217, 0.04)"
          strokeWidth={0.5}
        />

        {/* Center instructional text */}
        <g>
          <circle
            cx={0}
            cy={0}
            r={50}
            fill={`rgba(74, 144, 217, ${innerBloomOpacity})`}
          />
          <circle
            cx={0}
            cy={0}
            r={38}
            fill={`rgba(74, 144, 217, ${innerHaloOpacity})`}
          />
          <circle
            cx={0}
            cy={0}
            r={30}
            fill={`rgba(17, 33, 60, ${innerFillOpacity})`}
            stroke={`rgba(74, 144, 217, ${innerCoreStrokeOpacity})`}
            strokeWidth={1}
          />
          <text
            x={0}
            y={-4}
            textAnchor="middle"
            className="select-none fill-navy-100/90 transition-all duration-280"
            style={{
              fontSize: '9.4px',
              letterSpacing: '0.08em',
              fontWeight: 450,
              opacity: centerTextOpacity,
            }}
          >
            <tspan x={0} dy={0}>Use to</tspan>
            <tspan x={0} dy={13}>Navigate</tspan>
          </text>
        </g>

        {/* Tick marks on the ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const isNavAngle = NAV_ITEMS.some(
            (item) => Math.abs(((item.angle % 360) + 360) % 360 - i * 15) < 1
          );
          const inner = isNavAngle ? ringRadius - 5 : ringRadius - 3;
          const outer = isNavAngle ? ringRadius + 5 : ringRadius + 2;
          return (
            <line
              key={i}
              x1={Math.cos(a) * inner}
              y1={Math.sin(a) * inner}
              x2={Math.cos(a) * outer}
              y2={Math.sin(a) * outer}
              stroke={`rgba(74, 144, 217, ${isNavAngle ? 0.25 : 0.08})`}
              strokeWidth={isNavAngle ? 1.5 : 0.5}
            />
          );
        })}

        {/* Navigation nodes */}
        {NAV_ITEMS.map((item) => (
          <RingNode
            key={item.path}
            label={item.label}
            angle={item.angle}
            radius={ringRadius}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            isReady={isActive}
            onBlockedClick={handleBlockedRingPress}
            onHoverChange={setIsNodeHovered}
          />
        ))}
      </svg>
    </div>
  );
};

export default HomepageRing;
