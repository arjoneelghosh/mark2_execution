import React from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
  delay?: number;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, onClick, className = '', delay = 0 }) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        card-base group relative rounded-2xl p-6
        transition-all duration-280 cubic-bezier(0.4, 0, 0.2, 1)
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40
        ${onClick ? 'cursor-pointer' : ''}
        animate-fade-in opacity-0
        ${className}
      `}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/25 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-280" />
      {children}
    </div>
  );
};

export default GlowCard;
