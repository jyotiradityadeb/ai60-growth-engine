import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand & Context */}
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs">
              <Zap className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-100 tracking-tight">AI60 Growth Engine</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            NxtWave Growth Challenge Round 1 Submission. Designed & engineered for viral acquisition & attribution of final-year engineering students.
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            Campaign Constraints: 500 Registrations | 7 Days | ₹2,000 Budget
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap gap-6 text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Workshop Landing</Link>
          <Link href="/leaderboard" className="hover:text-cyan-400 transition-colors">Leaderboard</Link>
          <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Growth Control Room</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          <span>© {new Date().getFullYear()} AI60 Growth Engine. Built for Growth Product Simulation.</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-amber-400/80 font-mono text-[11px] bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
          <span>CAMPAIGN SIMULATION • LIVE TEST REGISTRATIONS</span>
        </div>
      </div>
    </footer>
  );
};
