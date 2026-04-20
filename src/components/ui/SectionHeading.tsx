import React from 'react';

interface SectionHeadingProps {
  heading: string;
  description?: string;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  heading,
  description,
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="mb-12">
      <h1 className="font-heading text-display font-semibold text-navy-50 mb-3">
        {heading}
      </h1>
      {description && (
        <p className="text-navy-300 text-base max-w-2xl leading-relaxed mb-8">
          {description}
        </p>
      )}
      {tabs && tabs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange?.(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250
                ${
                  activeTab === tab
                    ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/25'
                    : 'bg-white/[0.02] text-navy-300 border border-white/[0.06] hover:border-white/[0.12] hover:text-navy-100'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
