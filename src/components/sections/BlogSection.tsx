'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, BookOpen } from 'lucide-react';
import { blogPostsData, BlogPost } from '@/data/blog';
import { personalData } from '@/data/personal';
import { BlogModal } from '../ui/BlogModal';

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

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const displayPosts = blogPostsData.slice(0, 3);

  return (
    <section id="blog" className="w-full h-full flex flex-col justify-center overflow-y-auto lg:overflow-hidden font-mono">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-12 my-auto box-border"
      >
        {/* Centered Section Header matching Screenshot 4 */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight uppercase mb-3">
            BLOG
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mb-2 leading-relaxed">
            Thoughts, insights, and stories from my journey in tech, startups, and beyond.
          </p>
          <div className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
            <span>📡 Created, and maintained using Next.js & Markdown</span>
          </div>
        </div>

        {/* 3-Column Card Grid with Staggered Children */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        >
          {displayPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedPost(post)}
              className="bg-[#fafafa] border border-gray-200 rounded-md p-5 flex flex-col justify-between cursor-pointer group hover:border-gray-400 transition-all min-h-[220px]"
            >
              <div>
                {/* Date & Read Time Header */}
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-black tracking-tight mb-2 group-hover:text-teal-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between text-[11px] text-gray-500">
                <span>By {personalData.firstName} {personalData.lastName}</span>
                <span className="font-semibold text-black flex items-center gap-1 group-hover:text-teal-600">
                  Read more
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Center Open Blog Pill Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setSelectedPost(displayPosts[0])}
            className="px-6 py-2.5 bg-black text-white rounded-md font-mono text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Blog ↗</span>
          </button>
          <div className="text-[11px] text-gray-400 flex items-center gap-2">
            <span>3 recent posts</span>
            <span>•</span>
            <span>Updated live</span>
            <span>•</span>
            <span>Visit blog for more</span>
          </div>
        </div>

        {/* Interactive Modal */}
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      </motion.div>
    </section>
  );
};
