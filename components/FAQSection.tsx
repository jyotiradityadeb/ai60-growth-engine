'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this free?',
      a: 'Yes. This is a free 60-minute online workshop.',
    },
    {
      q: 'Who is this workshop for?',
      a: 'Our campaign is for final-year engineering students who want to build their first AI project.',
    },
    {
      q: 'How long is the workshop?',
      a: 'The online workshop is 60 minutes long.',
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto my-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Got Questions?
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-bold text-base sm:text-lg text-white tracking-tight">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-cyan-300' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
