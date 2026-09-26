'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Instagram, Check } from 'lucide-react';

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

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText('yaswanthkumarsirimella@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="scroll-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 my-auto box-border font-mono flex flex-col justify-between min-h-screen"
      >
        <div className="my-auto flex flex-col items-center text-center">
          {/* Two-Line Centered Heading */}
          <div className="mb-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-none mb-4">
              <span className="text-black block">GET IN</span>
              <span className="text-gray-400 block">TOUCH</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Open to full-time opportunities, collaborations, or automotive embedded software discussions.
            </p>
          </div>

          {/* Contact Cards Centered Row with Staggered Children */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full my-8"
          >
            {/* Card 1: Email */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -3, borderColor: '#000000' }}
              onClick={handleEmailClick}
              className="bg-white border border-gray-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all group shadow-sm"
            >
              {copiedEmail ? (
                <Check className="w-5 h-5 text-emerald-500 mb-2" />
              ) : (
                <Mail className="w-5 h-5 text-gray-800 mb-2 group-hover:scale-110 transition-transform" />
              )}
              <span className="text-xs font-bold text-black">
                {copiedEmail ? 'Copied Email!' : 'Email Direct'}
              </span>
            </motion.div>

            {/* Card 2: LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/yaswanthkumar-sirimella/"
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -3, borderColor: '#000000' }}
              className="bg-white border border-gray-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all group shadow-sm"
            >
              <Linkedin className="w-5 h-5 text-gray-800 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-black">LinkedIn Profile</span>
            </motion.a>

            {/* Card 3: GitHub Portfolio */}
            <motion.a
              href="https://yaswanthkumaryadav.github.io/My-Portifolio/"
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -3, borderColor: '#000000' }}
              className="bg-white border border-gray-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all group shadow-sm"
            >
              <Twitter className="w-5 h-5 text-gray-800 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-black">GitHub Portfolio</span>
            </motion.a>
          </motion.div>

          {/* Response time subtext */}
          <div className="text-[11px] text-gray-400">
            ⚡ Usually responds within 24 hours · Kansas City, MO · Open to Work
          </div>
        </div>

        {/* Terminal Footer Copyright Line */}
        <footer className="w-full pt-4 border-t border-gray-200 text-[11px] text-gray-400 flex flex-wrap items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} YASWANTH KUMAR SIRIMELLA. ALL RIGHTS RESERVED.
          </div>
          <div>
            BUILT WITH NEXT.JS 14 • TAILWIND CSS • FRAMER MOTION
          </div>
        </footer>
      </motion.div>
    </section>
  );
};
