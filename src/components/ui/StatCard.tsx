'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  number: string;
  label: string;
  accentColorClass?: string;
  isLarge?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  number,
  label,
  accentColorClass = 'border-t-teal-500',
  isLarge = false,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`
        bg-bg-secondary border border-border-light rounded-md p-5 border-t-2 ${accentColorClass}
        transition-all duration-200 cursor-default flex flex-col justify-center
        ${isLarge ? 'md:col-span-2 md:row-span-2 p-7 bg-white shadow-subtle' : ''}
        ${className}
      `}
    >
      <div className={`font-mono font-black text-gray-900 tracking-tight ${isLarge ? 'text-4xl lg:text-5xl mb-2' : 'text-3xl lg:text-4xl mb-1.5'}`}>
        {number}
      </div>
      <div className="font-mono text-xs font-semibold text-gray-500 tracking-wider uppercase">
        {label}
      </div>
    </motion.div>
  );
};
