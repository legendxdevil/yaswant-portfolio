'use client';

import React from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home', index: 0 },
  { id: 'status', label: 'Status', index: 1 },
  { id: 'work', label: 'Work', index: 2 },
  { id: 'blog', label: 'Blog', index: 3 },
  { id: 'contact', label: 'Contact', index: 4 },
];

interface ScrollDotRailProps {
  activeIndex: number;
  onSelectSection: (index: number) => void;
}

export const ScrollDotRail: React.FC<ScrollDotRailProps> = ({ activeIndex, onSelectSection }) => {
  const safeActiveIndex = Math.max(0, Math.min(sections.length - 1, activeIndex));
  const progressPercent = (safeActiveIndex / (sections.length - 1)) * 100;

  return (
    <div className="hidden lg:flex fixed right-6 top-0 bottom-0 z-50 flex-col items-center justify-center pointer-events-none">
      <div className="relative flex flex-col items-center gap-7 pointer-events-auto">
        {/* Vertical Line Container Bounded Strictly Between 1st and 5th Dot Centers */}
        <div className="absolute top-[12px] bottom-[12px] left-1/2 -translate-x-1/2 w-[1px] pointer-events-none">
          {/* Base Inactive Gray Line */}
          <div className="absolute inset-0 bg-gray-300 w-[1px]" />

          {/* Active Filled Black Line overlay that extends to current active dot */}
          <div
            className="absolute top-0 left-0 w-[1.5px] bg-black transition-all duration-300 ease-out"
            style={{ height: `${progressPercent}%` }}
          />
        </div>

        {/* 5 Section Dots */}
        {sections.map((sec, idx) => {
          const isActive = idx === safeActiveIndex;
          const isPast = idx < safeActiveIndex;

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.index)}
              aria-label={`Go to ${sec.label}`}
              className="group relative flex items-center justify-center w-6 h-6 focus:outline-none bg-white rounded-full z-10"
            >
              {/* Tooltip on hover */}
              <span className="absolute right-9 px-2.5 py-1 bg-gray-900 text-white font-mono text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-md">
                {sec.label}
              </span>

              {/* Dot Icon state logic */}
              <div className="relative flex items-center justify-center">
                {isActive ? (
                  <div className="relative flex items-center justify-center">
                    {/* Faint Outer Halo Ring */}
                    <div className="absolute -inset-2 rounded-full bg-gray-100/90 border border-gray-200/60" />

                    {/* Active Ring + Solid Center Dot */}
                    <motion.div
                      layoutId="activeDotVisual"
                      className="w-4 h-4 rounded-full border-[1.5px] border-black bg-white flex items-center justify-center relative z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-black" />
                    </motion.div>
                  </div>
                ) : isPast ? (
                  /* Visited Page: Filled Solid Black Circle */
                  <div className="w-3.5 h-3.5 rounded-full bg-black" />
                ) : (
                  /* Future Page: Hollow Circle with Thin Gray Border */
                  <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-gray-400 bg-white group-hover:border-black transition-colors" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
