'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '@/data/projects';
import { PastelBorderColor } from './AccentCard';

const borderStyleMap: Record<PastelBorderColor, string> = {
  green: 'border-t-emerald-500',
  blue: 'border-t-sky-500',
  purple: 'border-t-purple-500',
  pink: 'border-t-pink-500',
  yellow: 'border-t-yellow-500',
  teal: 'border-t-teal-500',
  orange: 'border-t-orange-500',
};

interface ExperienceCardProps {
  project: ProjectItem;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`
        bg-white border border-gray-200 rounded-md p-4 sm:p-5 border-t-[3px]
        ${borderStyleMap[project.borderColor]}
        flex flex-col justify-between transition-all duration-200 h-full
      `}
    >
      <div>
        {/* Header Row */}
        <div className="flex flex-wrap items-start justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-mono text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
              {project.title}
            </h3>
            {project.badge && (
              <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                {project.badge}
              </span>
            )}
          </div>
          <span className="font-mono text-[11px] text-gray-400 font-medium">
            {project.dateRange}
          </span>
        </div>

        {/* Role Subtitle */}
        <div className="font-mono text-[11px] font-semibold text-teal-600 mb-2">
          {project.role}
        </div>

        {/* Description */}
        <p className="font-mono text-xs text-gray-600 leading-relaxed mb-2.5">
          {project.description}
        </p>

        {/* Bullet Points */}
        {project.bullets && project.bullets.length > 0 && (
          <ul className="space-y-1 mb-3 pl-2.5 border-l-2 border-gray-100">
            {project.bullets.map((bullet, idx) => (
              <li key={idx} className="font-mono text-[11px] text-gray-500 flex items-start">
                <span className="text-gray-400 mr-1.5 font-bold select-none">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Row: Tech Stack Pills & Action Buttons */}
      <div className="pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-1.5 mt-auto">
        <div className="flex flex-wrap gap-1 items-center">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-600 border border-gray-200/80 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo"
              className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
