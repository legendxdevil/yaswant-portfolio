'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Cpu, 
  ShieldCheck, 
  Lightbulb, 
  Wrench, 
  Radio, 
  Users, 
  Mail,
  ArrowRight
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function PhilosophyPage() {
  return (
    <main className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-[#11052b] via-[#1d0a3d] via-[#240e49] to-[#11052b] text-white font-mono overflow-y-auto overflow-x-hidden selection:bg-purple-500 selection:text-white custom-scrollbar">
      {/* Rich Atmospheric Purple Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="w-full max-w-6xl mx-auto pt-8 px-6 sm:px-10 flex items-center justify-between relative z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#241344]/90 border border-purple-700/50 text-gray-200 text-xs font-mono font-bold hover:bg-purple-900 hover:text-white hover:border-purple-400 transition-all shadow-xl backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-purple-300" />
          <span>Back to Portfolio</span>
        </Link>
      </header>

      {/* Main Philosophy Content Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-16 relative z-10 flex flex-col items-center">
        {/* Main Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 w-full"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f0abfc] via-[#d8b4fe] to-[#93c5fd] mb-6 font-mono">
            How I See the World
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-[#d8b4fe]/90 max-w-3xl mx-auto leading-relaxed font-mono">
            My approach to writing code that touches metal, solving the problems nobody else wants to touch, and building systems that stay reliable when it matters most.
          </p>
        </motion.div>

        {/* Cards Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-6"
        >
          {/* 1. Large Top Foundation Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-[#241344]/80 border border-purple-700/40 hover:border-purple-500/60 rounded-2xl p-7 sm:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 text-amber-400 font-bold mb-5">
              <Cpu className="w-6 h-6 text-amber-400 shrink-0" />
              <h2 className="text-white font-bold text-lg sm:text-2xl font-mono">The Foundation</h2>
            </div>
            <div className="space-y-4 text-xs sm:text-base text-gray-200 leading-relaxed font-mono">
              <p>
                I believe the best embedded code is invisible when it works — and the reason everything doesn't fall apart when it shouldn't. Whether I'm parsing sensor logs at 100Hz or verifying raw data quality in an automotive pipeline, it always comes down to one question: does this system behave exactly as intended, under every condition it will ever see?
              </p>
              <p>
                Firmware doesn't get a second chance the way a web app does. You can't push a hotfix to an ECU already deployed in a vehicle doing 80mph. That reality shapes everything I write. Every function, every boundary check, every timing assumption is a promise to the system — and I don't make promises I haven't stress-tested.
              </p>
            </div>
          </motion.div>

          {/* 2. Core Principles Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Craft for Reliability */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="bg-[#241344]/80 border border-purple-700/40 hover:border-purple-500/60 rounded-2xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-pink-400 mb-4">
                  <ShieldCheck className="w-6 h-6 text-pink-400 shrink-0" />
                  <h3 className="text-white font-bold text-lg sm:text-xl font-mono">Craft for Reliability</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-mono">
                  <p>
                    Every line of code in a safety-critical system is a quiet commitment. To the driver whose ABS your firmware controls. To the engineer who inherits your codebase five years later. To the spec that says respond in under 10ms — every single time, not just when conditions are ideal.
                  </p>
                  <p>
                    The smallest oversights in embedded have exponential consequences. A missed interrupt, an off-by-one in a buffer, a race condition nobody caught in review — these aren't just bugs. They're accidents waiting for the exact wrong moment. I bring an obsessive attention to the details that others rush past. Not because I'm slow. Because I know exactly what's riding on it.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Curiosity Over Comfort */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="bg-[#241344]/80 border border-purple-700/40 hover:border-purple-500/60 rounded-2xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-amber-400 mb-4">
                  <Lightbulb className="w-6 h-6 text-amber-400 shrink-0" />
                  <h3 className="text-white font-bold text-lg sm:text-xl font-mono">Curiosity Over Comfort</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-mono">
                  <p>
                    I'd so much rather be wrong and learning than right and bored. The embedded world is enormous — CAN, LIN, AUTOSAR, sensor fusion, RTOS internals, AI testing frameworks, MATLAB Coder deployment pipelines. I haven't mastered all of it. I'm not sure anyone has.
                  </p>
                  <p>
                    The best solutions come from asking "why does it behave this way?" long after most people would have moved on. That same curiosity pulled me from mechanical engineering into writing C++ for automotive systems — and it's what keeps pulling me forward into the embedded × AI intersection now.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Build for Real Constraints */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="bg-[#241344]/80 border border-purple-700/40 hover:border-purple-500/60 rounded-2xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-purple-300 mb-4">
                  <Wrench className="w-6 h-6 text-purple-300 shrink-0" />
                  <h3 className="text-white font-bold text-lg sm:text-xl font-mono">Build for Real Constraints</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-mono">
                  <p>
                    Automotive embedded doesn't care about your elegant abstraction if it blows the stack. It doesn't care about your clever design pattern if it adds 3ms of latency the spec didn't allow for. Real constraints are the most clarifying thing in engineering.
                  </p>
                  <p>
                    Working in the automotive domain taught me to respect hardware — not fight it. You learn to think in cycles, bytes, and interrupt priorities. You learn that a system working 99.9% of the time fails 1,000 times per million. And in a moving vehicle, that math is simply not acceptable. Every decision I make is grounded in that reality.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Test it in the Wild */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="bg-[#241344]/80 border border-purple-700/40 hover:border-purple-500/60 rounded-2xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-emerald-400 mb-4">
                  <Radio className="w-6 h-6 text-emerald-400 shrink-0" />
                  <h3 className="text-white font-bold text-lg sm:text-xl font-mono">Test it in the Wild</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-mono">
                  <p>
                    Simulations are optimistic by nature — they model what you expect to happen. Field data models what actually happens, including everything you didn't think to model.
                  </p>
                  <p>
                    Real validation happens when real sensors produce real data under real conditions nobody scripted. I've spent years writing the pipelines that process and verify that data. The noise, the edge cases, the "that's not supposed to happen" moments — that's where the real engineering lives. Instrument everything. Trust the data over assumptions. Iterate ruthlessly.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Build for the Engineer After You (Full width spanning card) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="md:col-span-2 bg-[#241344]/80 border border-purple-700/40 hover:border-purple-500/60 rounded-2xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-cyan-300 mb-4">
                  <Users className="w-6 h-6 text-cyan-300 shrink-0" />
                  <h3 className="text-white font-bold text-lg sm:text-xl font-mono">Build for the Engineer After You</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-base text-gray-200 leading-relaxed font-mono">
                  <p>
                    Technology should amplify human capability — not create a system so opaque that only one person can maintain it. The real measure of good embedded code isn't just "does it work now?" It's "can someone else confidently touch this two years from now?"
                  </p>
                  <p>
                    I write code I'd be proud for another engineer to read. Clear intent, sensible structure, comments that explain the why — not just the what. Because the system I hand off is the one someone else's career and reputation will depend on. That responsibility is not something I take lightly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3. Currently Exploring Section */}
          <motion.div
            variants={cardVariants}
            className="pt-8 text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-mono">
              Currently Exploring
            </h3>
            <div className="bg-[#241344]/80 border border-purple-700/40 rounded-2xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl">
              <p className="text-xs sm:text-base text-purple-200 leading-relaxed font-mono max-w-4xl mx-auto">
                Amplifying embedded intuition with AI testing practices (ISTQB) • Sensor fusion architectures for next-gen automotive perception • MATLAB Coder for production-grade algorithm deployment • The intersection of safety-critical systems and machine learning
              </p>
            </div>
          </motion.div>

          {/* 4. Bottom CTA Section with Big Purple Button */}
          <motion.div
            variants={cardVariants}
            className="pt-12 flex flex-col items-center text-center pb-16"
          >
            <p className="text-xs sm:text-base text-gray-300 mb-5 font-mono">
              Want to build something that has to work — no excuses?
            </p>
            <a
              href="mailto:yaswanthkumarsirimella@gmail.com"
              className="px-9 py-4 bg-[#a855f7] hover:bg-[#b56bfa] text-white rounded-xl text-sm sm:text-lg font-bold font-mono shadow-xl shadow-purple-950/70 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Mail className="w-5 h-5" />
              <span>Let's Connect</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
