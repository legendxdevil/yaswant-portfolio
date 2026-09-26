'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, BookOpen, Zap, Compass, Target, Quote } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const StatusSection: React.FC = () => {
  return (
    <section id="status" className="w-full h-full flex flex-col justify-center overflow-y-auto lg:overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 my-auto box-border">
        {/* Centered Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-mono text-4xl sm:text-5xl font-black text-black tracking-tight uppercase">
            CURRENT INTERESTS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-500 mt-2 font-normal">
            What's capturing my attention right now
          </p>
        </div>

        {/* 3 Columns x 2 Rows Grid with Staggered Children */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {/* Card 1: Current Location */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-[#fafafa] border border-gray-200 rounded-md p-5 border-t-[3px] border-t-emerald-500 font-mono flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/80">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">
                  Current Location
                </h3>
              </div>
              <div className="font-bold text-sm text-black mb-1">
                Indore / Bengaluru, India
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-gray-600 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Startups & AI 🚀</span>
              </div>
              <div className="pt-2 border-t border-gray-200/60 space-y-1 text-xs text-gray-500">
                <p>🌴 Building scalable web systems</p>
                <p>🍇 Living on coffee and curiosity</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Currently Reading */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-[#fafafa] border border-gray-200 rounded-md p-5 border-t-[3px] border-t-purple-500 font-mono flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/80">
                <BookOpen className="w-4 h-4 text-purple-500" />
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">
                  Currently Reading
                </h3>
              </div>
              <div className="font-bold text-sm text-black mb-0.5">
                Designing Data-Intensive Applications
              </div>
              <div className="text-xs text-gray-500 mb-3">
                by Martin Kleppmann
              </div>
              <div className="inline-block text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded mb-3">
                AI & Technology 🤖
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Exploring how reliable, scalable, and maintainable data architectures power modern AI systems.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Fuel Dashboard */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-[#fafafa] border border-gray-200 rounded-md p-5 border-t-[3px] border-t-purple-500 font-mono flex flex-col justify-between text-center"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/80 text-left">
                <Zap className="w-4 h-4 text-purple-500" />
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">
                  Fuel Dashboard
                </h3>
              </div>
              <div className="text-2xl mb-1">🧋</div>
              <div className="font-bold text-sm text-black mb-0.5">
                Matcha & Black Coffee
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Enhanced coding powers <br />
                <span className="text-emerald-600 font-semibold">+65% creativity</span>
              </div>
              <div className="pt-2 border-t border-gray-200/60">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                  Daily Intake Monitor:
                </div>
                <div className="flex justify-center gap-1.5 mb-1">
                  <div className="w-4 h-2 rounded-sm bg-emerald-400" />
                  <div className="w-4 h-2 rounded-sm bg-emerald-400" />
                  <div className="w-4 h-2 rounded-sm bg-emerald-400" />
                  <div className="w-4 h-2 rounded-sm bg-emerald-400" />
                  <div className="w-4 h-2 rounded-sm bg-purple-300" />
                </div>
                <div className="text-[10px] text-amber-600 font-semibold">
                  Optimal performance level achieved ⚡
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Exploring */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-[#fafafa] border border-gray-200 rounded-md p-5 border-t-[3px] border-t-pink-500 font-mono flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/80">
                <Compass className="w-4 h-4 text-pink-500" />
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">
                  Exploring
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-gray-700">
                <div className="bg-white border border-gray-200 rounded p-2 flex flex-col items-center justify-center min-h-[54px]">
                  <span className="mb-0.5">🧠</span>
                  <span>Novel Interfaces for AI</span>
                </div>
                <div className="bg-white border border-gray-200 rounded p-2 flex flex-col items-center justify-center min-h-[54px]">
                  <span className="mb-0.5">🌐</span>
                  <span>Distributed Systems</span>
                </div>
                <div className="bg-white border border-gray-200 rounded p-2 flex flex-col items-center justify-center min-h-[54px]">
                  <span className="mb-0.5">🕸️</span>
                  <span>Knowledge Graphs</span>
                </div>
                <div className="bg-white border border-gray-200 rounded p-2 flex flex-col items-center justify-center min-h-[54px]">
                  <span className="mb-0.5">🤖</span>
                  <span>Agent Frameworks</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Current Focus */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-[#fafafa] border border-gray-200 rounded-md p-5 border-t-[3px] border-t-amber-500 font-mono flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/80">
                <Target className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">
                  Current Focus
                </h3>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-bold text-black flex items-center gap-1">
                    <span>⚡ Multimodal AI Systems</span>
                  </div>
                  <div className="text-gray-500 text-[11px]">
                    Building intelligent video analysis & SAR satellite pipelines ✨
                  </div>
                </div>
                <div>
                  <div className="font-bold text-black flex items-center gap-1">
                    <span>🤖 Agentic Developer Tools</span>
                  </div>
                  <div className="text-gray-500 text-[11px]">
                    Building agent frameworks that automate code refactoring & debugging
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Current Inspiration */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-[#fafafa] border border-gray-200 rounded-md p-5 border-t-[3px] border-t-teal-500 font-mono flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/80">
                <Quote className="w-4 h-4 text-teal-500" />
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">
                  Current Inspiration
                </h3>
              </div>
              <blockquote className="italic text-xs text-gray-800 leading-relaxed mb-2">
                "Simplicity is prerequisite for reliability. Software engineering is the art of managing complexity."
              </blockquote>
              <div className="text-right text-xs text-gray-500 mb-3">
                - Edsger W. Dijkstra
              </div>
              <div className="pt-2 border-t border-gray-200/60 text-[10px] text-gray-500">
                ❤️ Reminder that clean code & clear architecture create lasting impact
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
