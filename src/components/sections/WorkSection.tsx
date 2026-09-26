'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, GitPullRequest } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { ExperienceCard } from '../ui/ExperienceCard';

interface Tab {
  id: 'work' | 'projects' | 'opensource';
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'work',
    label: 'Work',
    subtitle: 'Professional experience',
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: 'projects',
    label: 'Cool Projects',
    subtitle: 'Featured builds & experiments',
    icon: <Code className="w-4 h-4" />,
  },
  {
    id: 'opensource',
    label: 'Open Source',
    subtitle: 'Community contributions',
    icon: <GitPullRequest className="w-4 h-4" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const WorkSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'projects' | 'opensource'>('work');

  const filteredProjects = projectsData.filter((p) => p.category === activeTab);

  return (
    <section id="work" className="w-full h-full flex flex-col justify-start overflow-y-auto font-mono pt-20 sm:pt-24 pb-12 box-border">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-8 box-border"
      >
        {/* Centered Section Header - Pinned safely below floating navbar */}
        <div className="text-center mb-6 font-mono shrink-0">
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase mb-1.5">
            WORK & RESEARCH
          </h2>
          <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
            Explore my technical experience, engineered systems, and open-source contributions.
          </p>
        </div>

        {/* Main Grid: Sidebar (~25%) + Content Grid (~75%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Left Sidebar Tabs */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-start gap-2.5 p-3 rounded-md font-mono text-left transition-all duration-200 min-w-[180px] lg:min-w-0
                    ${
                      isActive
                        ? 'bg-black text-white shadow-md'
                        : 'bg-[#fafafa] text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }
                  `}
                >
                  <div className={`mt-0.5 ${isActive ? 'text-teal-400' : 'text-gray-500'}`}>
                    {tab.icon}
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wide">
                      {tab.label}
                    </div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        isActive ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {tab.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Grid with Scrollable Overflow */}
          <div
            data-scrollable="true"
            onWheel={(e) => e.stopPropagation()}
            className="lg:col-span-9 max-h-[62vh] overflow-y-auto pr-1.5 custom-scrollbar"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, x: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                    }}
                    className="h-full"
                  >
                    <ExperienceCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
