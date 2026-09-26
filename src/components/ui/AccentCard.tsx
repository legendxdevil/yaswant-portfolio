'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export type PastelBorderColor = 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'teal' | 'orange';

interface AccentCardProps {
  title: string;
  borderColor: PastelBorderColor;
  iconName?: string;
  children: React.ReactNode;
  className?: string;
}

const borderStyleMap: Record<PastelBorderColor, string> = {
  green: 'border-t-emerald-500',
  blue: 'border-t-sky-500',
  purple: 'border-t-purple-500',
  pink: 'border-t-pink-500',
  yellow: 'border-t-yellow-500',
  teal: 'border-t-teal-500',
  orange: 'border-t-orange-500',
};

const iconColorMap: Record<PastelBorderColor, string> = {
  green: 'text-emerald-600',
  blue: 'text-sky-600',
  purple: 'text-purple-600',
  pink: 'text-pink-600',
  yellow: 'text-yellow-600',
  teal: 'text-teal-600',
  orange: 'text-orange-600',
};

export const AccentCard: React.FC<AccentCardProps> = ({
  title,
  borderColor,
  iconName,
  children,
  className = '',
}) => {
  // Dynamically resolve icon component
  const IconComponent = iconName && (LucideIcons as Record<string, any>)[iconName]
    ? (LucideIcons as Record<string, any>)[iconName]
    : null;

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`
        bg-[#fafafa] border border-gray-200 rounded-md p-5 border-t-[3px]
        ${borderStyleMap[borderColor]}
        transition-all duration-200 flex flex-col justify-between ${className}
      `}
    >
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5">
          <h3 className="font-mono text-xs font-bold text-gray-800 tracking-wider uppercase flex items-center gap-2">
            {IconComponent && <IconComponent className={`w-4 h-4 ${iconColorMap[borderColor]}`} />}
            <span>{title}</span>
          </h3>
        </div>
        <div className="font-mono text-sm text-gray-700">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
