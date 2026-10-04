import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { DEMO_DATA_TAG } from '@/mock-data/campaign-data';

interface DemoBannerProps {
  subtitle?: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ subtitle }) => {
  return (
    <div className="w-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-y border-amber-500/30 px-4 py-2.5 text-center text-amber-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-inner">
      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
      <span>{DEMO_DATA_TAG}</span>
      {subtitle && <span className="hidden sm:inline text-amber-200/70 font-normal">| {subtitle}</span>}
    </div>
  );
};
