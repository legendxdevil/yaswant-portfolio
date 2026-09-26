'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  ArrowLeft, 
  Github, 
  Mail, 
  Sparkles, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  MapPin, 
  Plane, 
  Compass, 
  Wrench, 
  Gamepad2, 
  Utensils, 
  Dumbbell,
  Award
} from 'lucide-react';
import { personalData } from '@/data/personal';

const TOTAL_FRAMES = 200;
const FRAME_FOLDER = '/ezgif-3cad27c2ecf54fdf-jpg';

export default function SurpriseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);

  const touchStartYRef = useRef(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Canvas Drawing with 'cover' scaling behavior
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;

    if (displayW === 0 || displayH === 0) return;

    // Scale canvas for sharp retina rendering
    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayW, displayH);

    // Compute aspect-fill / cover scaling and center cropping
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const scale = Math.max(displayW / imgW, displayH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const offsetX = (displayW - drawW) / 2;
    const offsetY = (displayH - drawH) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();

    lastDrawnFrameRef.current = frameIndex;
  }, []);

  // 1. Image Preloading Strategy
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let count = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `${FRAME_FOLDER}/ezgif-frame-${frameNum}.jpg`;

      const onComplete = () => {
        count++;
        setLoadedCount(count);

        if (i === 1) {
          setFirstFrameLoaded(true);
        }

        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete;

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Draw initial poster frame as soon as frame 1 completes
  useEffect(() => {
    if (firstFrameLoaded && lastDrawnFrameRef.current < 0) {
      drawFrame(0);
    }
  }, [firstFrameLoaded, drawFrame]);

  // 2. Debounced Canvas Resize Handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (lastDrawnFrameRef.current >= 0) {
          drawFrame(lastDrawnFrameRef.current);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame]);

  // Initial draw once all frames are loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  // Helper to jump/scroll to a specific main section
  const scrollToStep = (sectionId: number) => {
    const sectionProgressMap: { [key: number]: number } = {
      0: 0.0,    // Intro (Beat 0)
      1: 0.04,   // Bio (Beat 1)
      2: 0.08,   // Stats (Beat 2)
      3: 0.13,   // Work Heading (Beat 3)
      4: 0.37,   // Education Heading (Beat 9)
      5: 0.61,   // Travel Heading (Beat 15)
      6: 0.81,   // Hobbies Heading (Beat 20)
      7: 0.98,   // Contact (Beat 25)
    };

    const targetP = sectionProgressMap[sectionId] ?? 0.0;
    targetProgressRef.current = targetP;

    if (sectionRef.current && typeof window !== 'undefined') {
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight || 1;
      const scrollableDist = rect.height - winH;
      const sectionTop = window.scrollY + rect.top;
      const targetScrollY = sectionTop + targetP * scrollableDist;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    }
  };

  // 3. High Performance LERP RAF Loop for 26 Dedicated Card Beats
  useEffect(() => {
    if (!isLoaded) return;

    let lastStep = -1;

    const updateFrame = () => {
      // Smooth 0.04 LERP factor for cinematic inertia delay while reading
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.04;

      const p = currentProgressRef.current;
      setScrollProgress(p);

      // Map progress to 26 granular beats across 5500vh
      let step = 0;
      if (p < 0.04) step = 0;
      else if (p >= 0.04 && p < 0.08) step = 1;
      else if (p >= 0.08 && p < 0.12) step = 2;
      // Work Section
      else if (p >= 0.12 && p < 0.16) step = 3;   // Work Intro Heading
      else if (p >= 0.16 && p < 0.20) step = 4;   // Work 1: VClean
      else if (p >= 0.20 && p < 0.24) step = 5;   // Work 2: UCM IT Support
      else if (p >= 0.24 && p < 0.28) step = 6;   // Work 3: Standalone IT
      else if (p >= 0.28 && p < 0.32) step = 7;   // Work 4: Prasquare Tech
      else if (p >= 0.32 && p < 0.36) step = 8;   // Work 5: Advithri Tech
      // Edu Section
      else if (p >= 0.36 && p < 0.40) step = 9;   // Edu Intro Heading
      else if (p >= 0.40 && p < 0.44) step = 10;  // Edu 1: MS Industrial Tech
      else if (p >= 0.44 && p < 0.48) step = 11;  // Edu 2: B.Tech Mechanical
      else if (p >= 0.48 && p < 0.52) step = 12;  // Cert 1: ISTQB AI Testing
      else if (p >= 0.52 && p < 0.56) step = 13;  // Cert 2: MATLAB Coder
      else if (p >= 0.56 && p < 0.60) step = 14;  // Cert 3: Six Sigma Green Belt
      // Travel Section
      else if (p >= 0.60 && p < 0.64) step = 15;  // Travel Intro Heading
      else if (p >= 0.64 && p < 0.68) step = 16;  // Travel 1: US Road Trips
      else if (p >= 0.68 && p < 0.72) step = 17;  // Travel 2: Global Safaris
      else if (p >= 0.72 && p < 0.76) step = 18;  // Travel 3: North India Heritage
      else if (p >= 0.76 && p < 0.80) step = 19;  // Travel 4: Rameshwaram Coastal
      // Hobbies Section
      else if (p >= 0.80 && p < 0.84) step = 20;  // Hobbies Intro Heading
      else if (p >= 0.84 && p < 0.88) step = 21;  // Hobby 1: DIY Tinkering
      else if (p >= 0.88 && p < 0.915) step = 22; // Hobby 2: PUBG Gaming
      else if (p >= 0.915 && p < 0.95) step = 23; // Hobby 3: Home Culinary
      else if (p >= 0.95 && p < 0.975) step = 24; // Hobby 4: Fitness & Hikes
      else if (p >= 0.975) step = 25;             // Contact Transmission

      if (step !== lastStep) {
        lastStep = step;
        setActiveStep(step);
      }

      const frameIndex = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(p * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastDrawnFrameRef.current) {
        drawFrame(frameIndex);
      }

      rafIdRef.current = requestAnimationFrame(updateFrame);
    };

    rafIdRef.current = requestAnimationFrame(updateFrame);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoaded, drawFrame]);

  // 4. Unified Scroll Input Drivers (Mouse Wheel, Touch Swipe & Page Scroll)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY * 0.00010; // Ultra smooth & relaxed scroll multiplier across 5500vh
      const nextProgress = Math.max(0, Math.min(1, targetProgressRef.current + delta));
      targetProgressRef.current = nextProgress;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      touchStartYRef.current = touchY;

      const delta = deltaY * 0.00020;
      const nextProgress = Math.max(0, Math.min(1, targetProgressRef.current + delta));
      targetProgressRef.current = nextProgress;
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight || 1;
      const scrollableDist = rect.height - winH;

      if (scrollableDist > 0 && rect.top <= 0) {
        const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollableDist));
        targetProgressRef.current = rawProgress;
      }
    };

    handleScroll();
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  // Helper for determining main section ID from active beat (0 to 25)
  const getMainSectionId = (step: number) => {
    if (step === 0) return 0;
    if (step === 1) return 1;
    if (step === 2) return 2;
    if (step >= 3 && step <= 8) return 3;   // Work (Heading + 5 cards)
    if (step >= 9 && step <= 14) return 4;  // Education (Heading + 5 cards)
    if (step >= 15 && step <= 19) return 5; // Travel (Heading + 4 cards)
    if (step >= 20 && step <= 24) return 6; // Hobbies (Heading + 4 cards)
    return 7;                               // Contact
  };

  const activeMainSection = getMainSectionId(activeStep);

  return (
    <section
      id="surprise"
      ref={sectionRef}
      className="relative w-full h-[5500vh] bg-[#030303] select-none font-mono"
    >
      {/* Sticky Viewport Frame Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Loading Screen until 100% preloaded */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 bg-[#030303] flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 border-2 border-red-900 border-t-red-500 rounded-full animate-spin mb-4" />
            <span className="text-xs text-red-500 font-bold tracking-widest uppercase">
              LOADING SURPRISE SEQUENCE ({progressPercent}%)
            </span>
            <div className="w-48 h-1 bg-gray-900 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Top Header Navigation & Section Badges */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-40 flex items-center justify-between pointer-events-none">
          <Link
            href="/"
            className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#090909]/90 border border-gray-800 text-gray-300 text-xs font-bold hover:bg-black hover:text-white hover:border-red-600 transition-all shadow-xl backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span className="hidden sm:inline">Return to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Clickable Active Section Pill Badges */}
          <div className="hidden md:flex items-center gap-1 bg-[#090909]/90 border border-gray-800/90 p-1.5 rounded-xl backdrop-blur-md pointer-events-auto">
            {[
              { id: 0, label: 'INTRO' },
              { id: 1, label: 'BIO' },
              { id: 2, label: 'STATS' },
              { id: 3, label: 'WORK' },
              { id: 4, label: 'EDUCATION' },
              { id: 5, label: 'TRAVEL' },
              { id: 6, label: 'HOBBIES' },
              { id: 7, label: 'CONTACT' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => scrollToStep(st.id)}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                  activeMainSection === st.id
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
                }`}
              >
                0{st.id} {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Frame Scrubbing Engine */}
        <div className="relative w-full h-screen overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Dark Radial Vignette Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(3, 3, 3, 0.94) 100%)',
            }}
          />

          {/* Grain Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DEDICATED INDIVIDUAL FLOATING CARDS (BEAT 0 THROUGH 25)       */}
        {/* ------------------------------------------------------------- */}
        {isLoaded && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              
              {/* BEAT 0: INTRO HINT CARD (CENTER) */}
              {activeStep === 0 && (
                <motion.div
                  key="beat-0"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#080808]/95 border border-red-800/80 rounded-2xl p-6 sm:p-8 max-w-md text-center shadow-[0_0_50px_rgba(220,38,38,0.25)] backdrop-blur-xl pointer-events-auto"
                >
                  <span className="text-[10px] text-red-500 font-bold tracking-widest uppercase bg-red-950/80 border border-red-800 px-3 py-1 rounded-full">
                    SURPRISE SEQUENCE ACTIVE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-4 uppercase">
                    SCROLL TO EXPLORE YASWANTH'S STORY
                  </h2>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed">
                    Scrub down with your mouse wheel or touch swipe to watch the character move while individual experience cards appear one by one!
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] text-red-400 font-bold tracking-wider animate-pulse">
                    <span>SCROLL DOWN TO BEGIN</span> ↓
                  </div>
                </motion.div>
              )}

              {/* BEAT 1: ENGINEER IDENTITY (LEFT BOX) */}
              {activeStep === 1 && (
                <motion.div
                  key="beat-1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-red-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <span className="text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-red-500" /> 01 / ENGINEER IDENTITY
                    </span>
                    <span className="text-gray-400 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded text-[10px]">
                      KANSAS CITY, MO
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                    {personalData.firstName} {personalData.lastName}
                  </h3>
                  <div className="text-xs text-red-400 font-semibold mb-3">
                    {personalData.title}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {personalData.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-800/80">
                    <span className="text-[10px] bg-[#111111] text-gray-400 border border-gray-800 px-2.5 py-1 rounded">
                      Status: {personalData.workAuthorization}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* BEAT 2: TELEMETRY & METRICS (RIGHT BOX) */}
              {activeStep === 2 && (
                <motion.div
                  key="beat-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-blue-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[11px] mb-4">
                    <span className="text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-blue-400" /> 02 / SYSTEM TELEMETRY
                    </span>
                    <span className="text-gray-500 font-mono text-[10px]">METRICS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                    <div className="p-3 bg-[#111111] rounded-xl border border-gray-800">
                      <div className="text-2xl font-black text-white">5+</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">YEARS EMBEDDED</div>
                    </div>
                    <div className="p-3 bg-[#111111] rounded-xl border border-gray-800">
                      <div className="text-2xl font-black text-white">5</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">COMPANIES</div>
                    </div>
                    <div className="p-3 bg-[#111111] rounded-xl border border-gray-800">
                      <div className="text-2xl font-black text-white">2</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">CERTIFICATIONS</div>
                    </div>
                    <div className="p-3 bg-[#111111] rounded-xl border border-gray-800">
                      <div className="text-2xl font-black text-white">2</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">DEGREES</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['C++', 'Python', 'MATLAB Coder', 'Sensor Logs', 'ISTQB AI Testing', 'Linux'].map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-900 text-gray-300 border border-gray-800 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* BEAT 3: WORK SECTION CENTERED HEADING CARD */}
              {activeStep === 3 && (
                <motion.div
                  key="beat-3-work-heading"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#080808]/95 border border-emerald-500/80 rounded-2xl p-7 sm:p-9 max-w-lg text-center shadow-[0_0_50px_rgba(16,185,129,0.25)] backdrop-blur-xl pointer-events-auto"
                >
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> 03 / WORK EXPERIENCE MILESTONES
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-tight uppercase leading-snug">
                    5+ YEARS IN AUTOMOTIVE EMBEDDED & SOFTWARE ENGINEERING
                  </h2>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed">
                    Scroll to view my senior software development roles, telemetry systems engineering, and automotive log parsing milestones.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] text-emerald-400 font-bold tracking-wider animate-pulse">
                    <span>SCROLL DOWN TO VIEW WORK MILESTONES</span> ↓
                  </div>
                </motion.div>
              )}

              {/* BEAT 4: WORK 1 — VCLEAN (LEFT BOX) */}
              {activeStep === 4 && (
                <motion.div
                  key="beat-4"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-emerald-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-emerald-500/60 text-emerald-400 font-mono font-bold">
                      FEB 2026 — PRESENT
                    </span>
                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">
                      UNITED STATES
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-400 shrink-0" />
                    VClean — Senior Software Dev Engineer
                  </h3>
                  <div className="text-xs text-emerald-400 font-semibold mt-1">United States</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Building robust software systems as a senior engineer. Driving technical decisions, core product architecture, and optimization in a high-throughput environment.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-800/80">
                    {['C++', 'Python', 'Software Architecture', 'Optimization'].map((t, i) => (
                      <span key={i} className="text-[10px] bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* BEAT 5: WORK 2 — UNIV OF CENTRAL MISSOURI (RIGHT BOX) */}
              {activeStep === 5 && (
                <motion.div
                  key="beat-5"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-blue-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(96,165,250,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-blue-500/60 text-blue-400 font-mono font-bold">
                      FEB 2025 — DEC 2025
                    </span>
                    <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">
                      WARRENSBURG, MO
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400 shrink-0" />
                    Univ. of Central Missouri — IT Support
                  </h3>
                  <div className="text-xs text-blue-400 font-semibold mt-1">Facilities & IT Systems</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Administered & optimized Web TMA work order and asset management system. Delivered sysadmin technical support and data pipeline management.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-800/80">
                    {['Web TMA', 'IT Support', 'Data Management', 'SysAdmin'].map((t, i) => (
                      <span key={i} className="text-[10px] bg-blue-950/40 text-blue-300 border border-blue-800/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* BEAT 6: WORK 3 — STANDALONE IT SOLUTIONS (LEFT BOX) */}
              {activeStep === 6 && (
                <motion.div
                  key="beat-6"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-purple-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(192,132,252,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-purple-500/60 text-purple-400 font-mono font-bold">
                      AUG 2022 — NOV 2024
                    </span>
                    <span className="text-purple-400 font-bold uppercase tracking-widest text-[10px]">
                      INDIA
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-400 shrink-0" />
                    Standalone IT Solutions — Senior Engineer
                  </h3>
                  <div className="text-xs text-purple-400 font-semibold mt-1">Software Engineering</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Led software engineering efforts focusing on code quality, performance optimization, and architectural decisions across multi-functional development teams.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-800/80">
                    {['Python', 'C++', 'Software Engineering', 'System Architecture'].map((t, i) => (
                      <span key={i} className="text-[10px] bg-purple-950/40 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* BEAT 7: WORK 4 — PRASQUARE TECHNOLOGIES (RIGHT BOX) */}
              {activeStep === 7 && (
                <motion.div
                  key="beat-7"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-pink-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(244,114,182,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-pink-500/60 text-pink-400 font-mono font-bold">
                      APR 2020 — JUN 2022
                    </span>
                    <span className="text-pink-400 font-bold uppercase tracking-widest text-[10px]">
                      INDIA
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-pink-400 shrink-0" />
                    Prasquare Technologies LLC — SW Engineer
                  </h3>
                  <div className="text-xs text-pink-400 font-semibold mt-1">Automotive Telemetry</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Engineered Python and C++ scripts to parse high-frequency sensor logs and verify raw data quality in automotive telemetry pipelines.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-800/80">
                    {['Python', 'C++', 'Sensor Logs', 'Raw Data QA', 'Telemetry'].map((t, i) => (
                      <span key={i} className="text-[10px] bg-pink-950/40 text-pink-300 border border-pink-800/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* BEAT 8: WORK 5 — ADVITHRI TECH (LEFT BOX) */}
              {activeStep === 8 && (
                <motion.div
                  key="beat-8"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-amber-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(251,191,36,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-amber-500/60 text-amber-400 font-mono font-bold">
                      JUN 2019 — MAR 2020
                    </span>
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">
                      INDIA
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-amber-400 shrink-0" />
                    Advithri Tech IT Pvt Ltd — Jr. SW Engineer
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold mt-1">Embedded Software Basics</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Foundational work in scripting, data handling, embedded systems logic, and unit testing protocols.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-800/80">
                    {['Python', 'C++', 'Data Handling', 'Embedded Basics'].map((t, i) => (
                      <span key={i} className="text-[10px] bg-amber-950/40 text-amber-300 border border-amber-800/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* BEAT 9: EDUCATION SECTION CENTERED HEADING CARD */}
              {activeStep === 9 && (
                <motion.div
                  key="beat-9-edu-heading"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#080808]/95 border border-amber-500/80 rounded-2xl p-7 sm:p-9 max-w-lg text-center shadow-[0_0_50px_rgba(245,158,11,0.25)] backdrop-blur-xl pointer-events-auto"
                >
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest bg-amber-950/80 border border-amber-800/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> 04 / ACADEMICS & CERTIFICATIONS
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 tracking-tight uppercase leading-snug">
                    DEGREES & CERTIFIED INDUSTRY QUALIFICATIONS
                  </h2>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed">
                    Scroll to explore academic degrees, Master's degree specialization, and official ISTQB/MathWorks certifications.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] text-amber-400 font-bold tracking-wider animate-pulse">
                    <span>SCROLL DOWN TO VIEW DEGREES & CERTS</span> ↓
                  </div>
                </motion.div>
              )}

              {/* BEAT 10: DEGREE 1 — MS INDUSTRIAL TECH @ UCM (RIGHT BOX) */}
              {activeStep === 10 && (
                <motion.div
                  key="beat-10"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-amber-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(245,158,11,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-amber-500/60 text-amber-400 font-mono font-bold">
                      DEC 2024 — DEC 2026
                    </span>
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">
                      MASTER'S DEGREE
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-400 shrink-0" />
                    Master of Science (MS) — Industrial Technology
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold mt-1">University of Central Missouri</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Specializing in industrial automation systems, Web TMA asset management optimization, and software engineering performance.
                  </p>
                </motion.div>
              )}

              {/* BEAT 11: DEGREE 2 — B.TECH MECHANICAL @ SSN (LEFT BOX) */}
              {activeStep === 11 && (
                <motion.div
                  key="beat-11"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-amber-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(234,179,8,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-amber-500/60 text-amber-400 font-mono font-bold">
                      AUG 2016 — JUL 2020
                    </span>
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">
                      BACHELOR'S DEGREE
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-400 shrink-0" />
                    B.Tech — Mechanical Engineering
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold mt-1">S.S.N. Engineering College</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Foundations in engineering physics, physical kinematics, structural dynamics, and computer programming principles.
                  </p>
                </motion.div>
              )}

              {/* BEAT 12: CERT 1 — ISTQB AI TESTING (RIGHT BOX) */}
              {activeStep === 12 && (
                <motion.div
                  key="beat-12"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-emerald-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-emerald-500/60 text-emerald-400 font-mono font-bold">
                      ISTQB CERTIFIED
                    </span>
                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">
                      VERIFIED CREDENTIAL
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    ASTQB / ISTQB Certified Tester AI Testing
                  </h3>
                  <div className="text-xs text-emerald-400 font-semibold mt-1">Official ISTQB Certification</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Certified in testing AI models, validating non-deterministic model safety, and verifying raw sensor datasets for quality assurance.
                  </p>
                </motion.div>
              )}

              {/* BEAT 13: CERT 2 — MATLAB CODER (LEFT BOX) */}
              {activeStep === 13 && (
                <motion.div
                  key="beat-13"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-cyan-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-cyan-500/60 text-cyan-400 font-mono font-bold">
                      MATHWORKS CERTIFIED
                    </span>
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">
                      VERIFIED CREDENTIAL
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-400 shrink-0" />
                    MATLAB Coder Onramp Certification
                  </h3>
                  <div className="text-xs text-cyan-400 font-semibold mt-1">MathWorks Official Certification</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Automated generation of optimized C/C++ code from MATLAB algorithm models for production automotive ECUs.
                  </p>
                </motion.div>
              )}

              {/* BEAT 14: CERT 3 — SIX SIGMA GREEN BELT (RIGHT BOX) */}
              {activeStep === 14 && (
                <motion.div
                  key="beat-14"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-blue-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(59,130,246,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-blue-500/60 text-blue-400 font-mono font-bold">
                      PROCESS QUALITY
                    </span>
                    <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">
                      GREEN BELT
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    Lean Six Sigma Green Belt
                  </h3>
                  <div className="text-xs text-blue-400 font-semibold mt-1">Quality & Defect Optimization</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Defect reduction, root cause triage, and statistical process quality control applied across software development lifecycles.
                  </p>
                </motion.div>
              )}

              {/* BEAT 15: TRAVEL SECTION CENTERED HEADING CARD */}
              {activeStep === 15 && (
                <motion.div
                  key="beat-15-travel-heading"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#080808]/95 border border-purple-500/80 rounded-2xl p-7 sm:p-9 max-w-lg text-center shadow-[0_0_50px_rgba(168,85,247,0.25)] backdrop-blur-xl pointer-events-auto"
                >
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest bg-purple-950/80 border border-purple-800/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
                    <Plane className="w-3.5 h-3.5 text-purple-400" /> 05 / TRAVEL & CULTURAL EXPEDITIONS
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 tracking-tight uppercase leading-snug">
                    GLOBAL ADAPTABILITY, US HIGHWAYS & HERITAGE CIRCUITS
                  </h2>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed">
                    Scroll to explore cross-cultural journeys, US highway road trips, wildlife safaris, and heritage expeditions.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] text-purple-400 font-bold tracking-wider animate-pulse">
                    <span>SCROLL DOWN TO VIEW TRAVEL MILESTONES</span> ↓
                  </div>
                </motion.div>
              )}

              {/* BEAT 16: TRAVEL 1 — US HIGHWAY ROAD TRIPS (LEFT BOX) */}
              {activeStep === 16 && (
                <motion.div
                  key="beat-16"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-purple-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-purple-500/60 text-purple-400 font-mono font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> KANSAS CITY → US HIGHWAYS
                    </span>
                    <span className="text-purple-400 font-bold uppercase tracking-widest text-[10px]">
                      ROAD TRIPS
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Plane className="w-5 h-5 text-purple-400 shrink-0" />
                    US Highway Road Trips & Scenic Drives
                  </h3>
                  <div className="text-xs text-purple-400 font-semibold mt-1">American Landscape Exploration</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Exploring scenic US highway routes, landmark drives, and American landscapes—embracing tech career & culture in the US.
                  </p>
                </motion.div>
              )}

              {/* BEAT 17: TRAVEL 2 — GLOBAL SAFARIS (RIGHT BOX) */}
              {activeStep === 17 && (
                <motion.div
                  key="beat-17"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-indigo-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(129,140,248,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-indigo-500/60 text-indigo-400 font-mono font-bold flex items-center gap-1">
                      <Plane className="w-3 h-3" /> GLOBAL EXPEDITIONS
                    </span>
                    <span className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">
                      WILDERNESS
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Plane className="w-5 h-5 text-indigo-400 shrink-0" />
                    International Safaris & Wildlife Journeys
                  </h3>
                  <div className="text-xs text-indigo-400 font-semibold mt-1">Wildlife & Nature Safaris</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Wildlife safaris and international terrain exploration—building adaptability and high comfort in novel environments.
                  </p>
                </motion.div>
              )}

              {/* BEAT 18: TRAVEL 3 — NORTH INDIA HERITAGE (LEFT BOX) */}
              {activeStep === 18 && (
                <motion.div
                  key="beat-18"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-blue-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(96,165,250,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-blue-500/60 text-blue-400 font-mono font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> DELHI • JAIPUR • AGRA
                    </span>
                    <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">
                      HERITAGE CIRCUIT
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                    North India Heritage & Royal Architecture
                  </h3>
                  <div className="text-xs text-blue-400 font-semibold mt-1">Monumental Forts & Culture</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Touring ancient monuments, royal forts, Taj Mahal heritage, and diverse cultural capitals across North India.
                  </p>
                </motion.div>
              )}

              {/* BEAT 19: TRAVEL 4 — RAMESHWARAM COASTAL (RIGHT BOX) */}
              {activeStep === 19 && (
                <motion.div
                  key="beat-19"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-cyan-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-cyan-500/60 text-cyan-400 font-mono font-bold flex items-center gap-1">
                      <Compass className="w-3 h-3" /> RAMESHWARAM
                    </span>
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">
                      COASTAL LANDMARK
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
                    Coastal Island & Pamban Bridge Landmarks
                  </h3>
                  <div className="text-xs text-cyan-400 font-semibold mt-1">Southern Island Expeditions</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Southern island ocean drives, coastal expeditions, and marveling at iconic historic bridge engineering landmarks.
                  </p>
                </motion.div>
              )}

              {/* BEAT 20: HOBBIES SECTION CENTERED HEADING CARD */}
              {activeStep === 20 && (
                <motion.div
                  key="beat-20-hobbies-heading"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#080808]/95 border border-pink-500/80 rounded-2xl p-7 sm:p-9 max-w-lg text-center shadow-[0_0_50px_rgba(236,72,153,0.25)] backdrop-blur-xl pointer-events-auto"
                >
                  <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest bg-pink-950/80 border border-pink-800/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
                    <Wrench className="w-3.5 h-3.5 text-pink-400" /> 06 / BEYOND THE CODE & HOBBIES
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 tracking-tight uppercase leading-snug">
                    HANDS-ON MAKER MINDSET & PERSONAL PASSIONS
                  </h2>
                  <p className="text-gray-300 text-xs mt-3 leading-relaxed">
                    Scroll to explore hardware tinkering, gaming battlegrounds, culinary art, and outdoor fitness pursuits.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] text-pink-400 font-bold tracking-wider animate-pulse">
                    <span>SCROLL DOWN TO VIEW HOBBY CARDS</span> ↓
                  </div>
                </motion.div>
              )}

              {/* BEAT 21: HOBBY 1 — DIY & TECH TINKERING (LEFT BOX) */}
              {activeStep === 21 && (
                <motion.div
                  key="beat-21"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-pink-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(236,72,153,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-pink-500/60 text-pink-400 font-mono font-bold">
                      MAKER MINDSET
                    </span>
                    <span className="text-pink-400 font-bold uppercase tracking-widest text-[10px]">
                      HARDWARE DIY
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-pink-400 shrink-0" />
                    DIY & Tech Tinkering
                  </h3>
                  <div className="text-xs text-pink-400 font-semibold mt-1">Hardware & PC Building</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Home renovation projects, custom PC setups, soldering electronics, and building physical hardware ideas from scratch.
                  </p>
                </motion.div>
              )}

              {/* BEAT 22: HOBBY 2 — GAMING & PUBG (RIGHT BOX) */}
              {activeStep === 22 && (
                <motion.div
                  key="beat-22"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-purple-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-purple-500/60 text-purple-400 font-mono font-bold">
                      STRATEGY GAMING
                    </span>
                    <span className="text-purple-400 font-bold uppercase tracking-widest text-[10px]">
                      TACTICAL PLAY
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-purple-400 shrink-0" />
                    Gaming & PUBG Sessions
                  </h3>
                  <div className="text-xs text-purple-400 font-semibold mt-1">Mobile & PC Battlegrounds</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    PUBG mobile/PC squad sessions, tactical battleground coordination, and getting those victorious Chicken Dinners!
                  </p>
                </motion.div>
              )}

              {/* BEAT 23: HOBBY 3 — HOME COOKING & CULINARY (LEFT BOX) */}
              {activeStep === 23 && (
                <motion.div
                  key="beat-23"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-amber-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(245,158,11,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-amber-500/60 text-amber-400 font-mono font-bold">
                      CULINARY PASSION
                    </span>
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">
                      HOMEMADE MEALS
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-amber-400 shrink-0" />
                    Home Cooking & Culinary Art
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold mt-1">Recipes & Family Time</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Preparing delicious homemade meals, experimenting with authentic recipes, and spending quality culinary time with family.
                  </p>
                </motion.div>
              )}

              {/* BEAT 24: HOBBY 4 — FITNESS & OUTDOOR HIKES (RIGHT BOX) */}
              {activeStep === 24 && (
                <motion.div
                  key="beat-24"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md bg-[#080808]/95 border border-emerald-500/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] backdrop-blur-xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className="px-2.5 py-1 rounded-full border border-emerald-500/60 text-emerald-400 font-mono font-bold">
                      PHYSICAL DISCIPLINE
                    </span>
                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">
                      GYM & HIKES
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-emerald-400 shrink-0" />
                    Fitness & Outdoor Hikes
                  </h3>
                  <div className="text-xs text-emerald-400 font-semibold mt-1">Gym Workouts & Nature Trails</div>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    Regular gym strength training, scenic outdoor hikes, and maintaining peak physical discipline alongside engineering work.
                  </p>
                </motion.div>
              )}

              {/* BEAT 25: TRANSMISSION & FINAL ACTIONS (CENTER BOX) */}
              {activeStep === 25 && (
                <motion.div
                  key="beat-25"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#080808]/95 border border-gray-800/90 rounded-2xl p-6 sm:p-8 max-w-lg text-center shadow-[0_0_50px_rgba(239,68,68,0.25)] backdrop-blur-xl pointer-events-auto relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-emerald-500 to-blue-600" />
                  
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 mb-2 uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" /> ● OPEN FOR ROLES IN US
                  </div>

                  <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight mb-2">
                    Let's Connect & Build Together
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    Open to full-time embedded software engineer roles, automotive firmware opportunities, or engineering discussions. Based in Kansas City, MO · Open to Relocation.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="mailto:yaswanthkumarsirimella@gmail.com"
                      className="px-4 py-2.5 bg-[#c40024] text-white rounded-xl text-xs font-bold hover:bg-[#e0002a] transition-all flex items-center gap-1.5 shadow-lg"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Direct</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/yaswanthkumar-sirimella/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-gray-900 border border-gray-800 text-gray-300 rounded-xl text-xs font-bold hover:text-white hover:border-gray-700 transition-all flex items-center gap-1.5"
                    >
                      <Github className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                    </a>

                    <Link
                      href="/"
                      className="px-4 py-2.5 bg-white text-gray-900 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Main Portfolio</span>
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
