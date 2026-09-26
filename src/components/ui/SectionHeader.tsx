'use client';

import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {badge && (
        <span className="inline-block font-mono text-[10px] font-bold tracking-widest text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase mb-2">
          {badge}
        </span>
      )}
      <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-xs sm:text-sm text-gray-500 mt-2 font-normal max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
