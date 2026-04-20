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
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-250
                ${
                  activeTab === tab
                    ? 'theme-pill-accent'
                    : 'theme-pill'
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
