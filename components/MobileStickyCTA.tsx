'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export const MobileStickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA when scrolled past hero section slightly
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const scrollToForm = () => {
    const el = document.getElementById('register-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/90 backdrop-blur-lg border-t border-cyan-500/30 shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold text-white tracking-tight truncate">
              Build AI Project in 60 Mins
            </span>
          </div>
          <p className="text-[10px] text-slate-400 truncate">Free Workshop • 2027 Grad Special</p>
        </div>

        <button
          onClick={scrollToForm}
          className="py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30 flex items-center gap-1.5 shrink-0 active:scale-95 transition-transform"
        >
          <span>Reserve Spot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
