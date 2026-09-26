'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LeftScrollProgressRailProps {
  activeIndex: number;
  totalSections?: number;
}

export const LeftScrollProgressRail: React.FC<LeftScrollProgressRailProps> = ({
  activeIndex,
  totalSections = 5,
}) => {
  // Height percentage from (1 / totalSections) to 100%
  const progressPercent = ((activeIndex + 1) / totalSections) * 100;

  return (
    <div className="fixed left-0 top-0 bottom-0 w-1 sm:w-1.5 z-50 bg-gray-200 pointer-events-none">
      {/* Black progress fill line flowing down as page sections transition */}
      <motion.div
        animate={{ height: `${progressPercent}%` }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        className="w-full bg-black rounded-b-full shadow-sm"
      />
    </div>
  );
};
