'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { personalData } from '@/data/personal';
import { TypewriterText } from '../ui/TypewriterText';

const statsList = [
  {
    number: '5+',
    label: 'YEARS IN EMBEDDED',
    offsetClass: 'ml-4 sm:ml-10',
    targetIndex: 2, // Work section
    tooltipText: '5+ years building production firmware, sensor log parsing pipelines, and automated test suites.',
  },
  {
    number: '5',
    label: 'COMPANIES WORKED',
    offsetClass: 'ml-0 mr-4 sm:mr-8',
    targetIndex: 2, // Work section
    tooltipText: 'Worked across 5 companies in embedded systems, automotive engineering, and IT software architecture.',
  },
  {
    number: '2',
    label: 'CERTIFICATIONS EARNED',
    offsetClass: 'ml-6 sm:ml-12',
    targetIndex: 1, // Status section
    tooltipText: 'ASTQB/ISTQB Certified Tester AI Testing & Official MathWorks MATLAB Coder Onramp Certification.',
  },
  {
    number: '2',
    label: 'DEGREES HELD',
    offsetClass: 'ml-0 mr-4 sm:mr-8',
    targetIndex: 2, // Work section
    tooltipText: 'MS Industrial Technology @ Univ. of Central Missouri & B.Tech Mechanical Engineering.',
  },
  {
    number: '4',
    label: 'DOMAINS & TECH',
    offsetClass: 'ml-5 sm:ml-10',
    targetIndex: 2, // Work section
    tooltipText: 'Specializing in Automotive, Industrial Tech, AI Testing, and Sensor Fusion Raw Data QA.',
  },
];

interface HomeSectionProps {
  onNavigate: (index: number) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const [hoveredCard, setHoveredCard] = useState<{ idx: number; x: number; y: number } | null>(null);
  const [hoveredName, setHoveredName] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    setHoveredCard({
      idx,
      x: e.clientX + 16,
      y: e.clientY + 16,
    });
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleNameMouseMove = (e: React.MouseEvent) => {
    setHoveredName({
      x: e.clientX + 16,
      y: e.clientY + 16,
    });
  };

  const handleNameMouseLeave = () => {
    setHoveredName(null);
  };

  return (
    <section id="home" className="w-full h-full flex flex-col justify-between overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 py-16 flex flex-col justify-between min-h-screen my-auto box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Left Column (Content ~55%) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Hero Name - Huge Two Line Depth with Surprise Link */}
            <Link
              href="/surprise"
              className="group inline-block w-max cursor-pointer"
              onMouseMove={handleNameMouseMove}
              onMouseLeave={handleNameMouseLeave}
            >
              <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6 relative select-none">
                <span className="text-black block group-hover:translate-x-1.5 transition-transform duration-200">
                  {personalData.firstName}
                </span>
                <span className="text-gray-400 block group-hover:text-black group-hover:translate-x-1.5 transition-all duration-200">
                  {personalData.lastName}
                </span>
              </h1>
            </Link>

            {/* Typewriter Line */}
            <div className="mb-6 min-h-[32px] text-lg sm:text-xl">
              <TypewriterText lines={personalData.typewriterLines} />
            </div>

            {/* 3-line static subtext */}
            <div className="font-mono text-xs sm:text-sm text-gray-500 leading-relaxed mb-8 space-y-1">
              <p className="text-gray-800 font-semibold">Embedded Software Engineer · Kansas City, MO</p>
              <p>Automotive Domain & Sensor Fusion Specialist</p>
              <p>C++ & Python · Building firmware that actually ships</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/philosophy"
                className="px-6 py-2.5 bg-black text-white rounded-md font-mono text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 text-white fill-none stroke-[2]" />
                <span>My Philosophy</span>
              </Link>
              <button
                onClick={() => onNavigate(4)}
                className="px-6 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-md font-mono text-xs font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
              >
                <span>Get In Touch</span>
              </button>
            </div>

            {/* Circular Social Icon Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://yaswanthkumaryadav.github.io/My-Portifolio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Portfolio"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/yaswanthkumar-sirimella/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:yaswanthkumarsirimella@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column (5 Staggered Stat Cards with Mouse-Following Tooltip) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {statsList.map((stat, idx) => (
              <motion.div
                key={idx}
                onClick={() => onNavigate(stat.targetIndex)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}
                transition={{ duration: 0.15 }}
                className={`
                  bg-[#fafafa] border border-gray-200/90 rounded-md py-4 px-6 font-mono cursor-pointer
                  transition-all relative group flex items-center justify-between
                  ${stat.offsetClass}
                `}
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-black tracking-tight group-hover:text-black transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase mt-0.5 group-hover:text-gray-600 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Down Label & Arrow Bottom Center */}
        <div
          onClick={() => onNavigate(1)}
          className="mx-auto flex flex-col items-center gap-1 font-mono text-[10px] text-gray-400 hover:text-black transition-colors cursor-pointer animate-bounce-slow mt-4"
        >
          <span className="tracking-widest">SCROLL</span>
          <ArrowDown className="w-3 h-3" />
        </div>
      </div>

      {/* Floating Mouse-Following Cursor Tooltip for Stat Cards */}
      {hoveredCard && (
        <div
          style={{
            position: 'fixed',
            left: `${hoveredCard.x}px`,
            top: `${hoveredCard.y}px`,
            zIndex: 9999,
          }}
          className="pointer-events-none bg-black/95 text-white font-mono text-[11px] sm:text-xs px-3.5 py-2.5 rounded-md shadow-2xl max-w-sm leading-relaxed border border-gray-800"
        >
          {statsList[hoveredCard.idx].tooltipText}
        </div>
      )}

      {/* Floating Mouse-Following Cursor Tooltip for Hero Name */}
      {hoveredName && (
        <div
          style={{
            position: 'fixed',
            left: `${hoveredName.x}px`,
            top: `${hoveredName.y}px`,
            zIndex: 9999,
          }}
          className="pointer-events-none bg-black text-white font-mono text-xs px-3.5 py-2 rounded-md shadow-2xl flex items-center gap-2 border border-gray-800"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
          <span className="font-bold">Click me for a surprise</span>
        </div>
      )}
    </section>
  );
};

