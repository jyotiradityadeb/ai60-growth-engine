import React from 'react';
import { ValueBadges } from '@/components/ValueBadges';
import { RegistrationForm } from '@/components/RegistrationForm';
import { ProgramOverview } from '@/components/ProgramOverview';
import { FAQSection } from '@/components/FAQSection';
import { ArrowDown, Zap } from 'lucide-react';

export default function CampaignPage() {
  return (
    <div className="relative overflow-hidden">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        
        {/* Campaign Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-inner">
          <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
          <span>NxtWave Growth Challenge • Free Online Workshop</span>
        </div>
        <p className="text-xs font-mono text-amber-300">DEMO DATA — CAMPAIGN SIMULATION</p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
          Build Your First AI Project <br className="hidden sm:inline" />
          <span className="text-gradient">in 60 Minutes</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          Join a free online workshop and build your first AI project in 60 minutes.
        </p>

        {/* Value Badges */}
        <ValueBadges />

        {/* Scroll down indicator */}
        <div className="pt-2 text-slate-500 text-xs flex items-center justify-center gap-1.5 font-mono">
          <span>Fill in your details below to register</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <RegistrationForm />
      </section>

      {/* Program Overview: WHAT YOU'LL DO & WHY IT MATTERS */}
      <section className="px-4 sm:px-6 lg:px-8">
        <ProgramOverview />
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <FAQSection />
      </section>

    </div>
  );
}
