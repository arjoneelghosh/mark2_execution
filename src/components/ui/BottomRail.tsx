import React from 'react';
import { Compass, Eye, ArrowRight } from 'lucide-react';

interface BottomRailProps {
  visible: boolean;
}

const railItems = [
  {
    icon: Eye,
    label: 'Current Focus',
    text: 'ML systems, forecasting workflows, and assistive interfaces',
  },
  {
    icon: Compass,
    label: 'Approach',
    text: 'Technical depth meets practical delivery and clear communication',
  },
  {
    icon: ArrowRight,
    label: 'Explore',
    text: 'Browse work, profile, experience, and research through the ring',
  },
];

const BottomRail: React.FC<BottomRailProps> = ({ visible }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30
        transition-all duration-500 ease-out
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      <div className="border-t border-white/[0.05] bg-navy-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between gap-8">
          {railItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 flex-1 min-w-0">
              <item.icon size={14} className="text-accent-blue/60 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-medium uppercase tracking-wider text-navy-400 block">
                  {item.label}
                </span>
                <span className="text-xs text-navy-300 block truncate">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomRail;
