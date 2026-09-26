'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface NavItem {
  id: string;
  label: string;
  index: number;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', index: 0 },
  { id: 'status', label: 'Status', index: 1 },
  { id: 'work', label: 'Work', index: 2 },
  { id: 'blog', label: 'Blog', index: 3 },
  { id: 'contact', label: 'Contact', index: 4 },
];

interface FloatingNavProps {
  activeIndex: number;
  onSelectSection: (index: number) => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ activeIndex, onSelectSection }) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-full shadow-nav flex items-center gap-1 font-mono text-xs">
      {navItems.map((item) => {
        const isActive = activeIndex === item.index;
        return (
          <button
            key={item.id}
            onClick={() => onSelectSection(item.index)}
            className={`
              relative px-4 py-1.5 rounded-full font-bold transition-colors duration-200
              ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activePillNav"
                className="absolute inset-0 bg-gray-200/80 rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
