'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  lines: string[];
  typingSpeed?: number; // ms per char
  deleteSpeed?: number; // ms per char
  pauseDuration?: number; // ms pause at full text
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  lines,
  typingSpeed = 50,
  deleteSpeed = 30,
  pauseDuration = 1600,
  className = '',
}) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!lines || lines.length === 0) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setCurrentText(lines[0]);
      return;
    }

    const targetLine = lines[lineIndex];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < targetLine.length) {
        timer = setTimeout(() => {
          setCurrentText(targetLine.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Full string typed, pause before deletion
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetLine.slice(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next string
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % lines.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, lineIndex, lines, typingSpeed, deleteSpeed, pauseDuration]);

  return (
    <div className={`font-mono text-teal-600 dark:text-teal-400 font-semibold flex items-center ${className}`}>
      <span className="mr-2 select-none text-teal-500 font-bold">&gt;</span>
      <span>{currentText}</span>
      <span className="inline-block w-2.5 h-5 ml-1 bg-teal-500 animate-pulse-subtle align-middle" />
    </div>
  );
};
