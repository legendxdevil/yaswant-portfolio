'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HomeSection } from '@/components/sections/HomeSection';
import { StatusSection } from '@/components/sections/StatusSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FloatingNav } from '@/components/nav/FloatingNav';
import { ScrollDotRail } from '@/components/nav/ScrollDotRail';
import { LeftScrollProgressRail } from '@/components/nav/LeftScrollProgressRail';

const SECTIONS_COUNT = 5;
const ANIMATION_DURATION = 700; // ms transition duration match

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(0);
  const lockTimer = useRef<NodeJS.Timeout | null>(null);

  const changeSection = useCallback((newIndex: number) => {
    const clamped = Math.max(0, Math.min(SECTIONS_COUNT - 1, newIndex));
    setActiveIndex((prev) => {
      if (prev === clamped) return prev;
      setIsAnimating(true);

      if (lockTimer.current) clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION);

      return clamped;
    });
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev >= SECTIONS_COUNT - 1) return prev;
      const nextIdx = prev + 1;
      setIsAnimating(true);
      if (lockTimer.current) clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION);
      return nextIdx;
    });
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev <= 0) return prev;
      const prevIdx = prev - 1;
      setIsAnimating(true);
      if (lockTimer.current) clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION);
      return prevIdx;
    });
  }, []);

  // Wheel Event Listener with { passive: false } to block native browser scroll unless inside a scrollable container
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      let el = e.target as HTMLElement | null;
      let scrollableTarget: HTMLElement | null = null;

      while (el && el !== document.body && el !== document.documentElement) {
        const isDeclared = el.hasAttribute('data-scrollable') || el.classList.contains('custom-scrollbar');
        const style = window.getComputedStyle(el);
        const hasOverflow = style.overflowY === 'auto' || style.overflowY === 'scroll';

        if ((isDeclared || hasOverflow) && el.scrollHeight > el.clientHeight + 2) {
          scrollableTarget = el;
          break;
        }
        el = el.parentElement;
      }

      if (scrollableTarget) {
        const canScrollDown = e.deltaY > 0 && scrollableTarget.scrollTop + scrollableTarget.clientHeight < scrollableTarget.scrollHeight - 2;
        const canScrollUp = e.deltaY < 0 && scrollableTarget.scrollTop > 2;

        if (canScrollDown || canScrollUp) {
          // Allow inner container to scroll natively!
          return;
        }

        // Mouse is over an inner scroll container; do not flip page sections on subtle boundary scrolling
        if (Math.abs(e.deltaY) < 50) {
          return;
        }
      }

      e.preventDefault();
      if (isAnimating) return;

      if (e.deltaY > 30) {
        goToNext();
      } else if (e.deltaY < -30) {
        goToPrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isAnimating, goToNext, goToPrev]);

  // Touch Event Listeners for Mobile Swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (deltaY > 50) {
        goToNext();
      } else if (deltaY < -50) {
        goToPrev();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnimating, goToNext, goToPrev]);

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        changeSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        changeSection(SECTIONS_COUNT - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, goToNext, goToPrev, changeSection]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white">
      {/* Left Side Flowing Black Scroll Progress Line matching user image */}
      <LeftScrollProgressRail activeIndex={activeIndex} totalSections={SECTIONS_COUNT} />

      {/* Synchronized Floating Navigation Pill */}
      <FloatingNav activeIndex={activeIndex} onSelectSection={changeSection} />

      {/* Synchronized Right Dot Rail */}
      <ScrollDotRail activeIndex={activeIndex} onSelectSection={changeSection} />

      {/* Main Animated FullPage.js-style Vertical Transform Slider */}
      <motion.div
        animate={{ y: `-${activeIndex * 100}vh` }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{ willChange: 'transform' }}
        className="w-full h-full"
      >
        <div style={{ height: '100vh', width: '100vw' }}>
          <HomeSection onNavigate={changeSection} />
        </div>
        <div style={{ height: '100vh', width: '100vw' }}>
          <StatusSection />
        </div>
        <div style={{ height: '100vh', width: '100vw' }}>
          <WorkSection />
        </div>
        <div style={{ height: '100vh', width: '100vw' }}>
          <BlogSection />
        </div>
        <div style={{ height: '100vh', width: '100vw' }}>
          <ContactSection />
        </div>
      </motion.div>
    </div>
  );
}
