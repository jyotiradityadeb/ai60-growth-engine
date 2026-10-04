import React from 'react';
import { Sparkles, Clock, Code, CheckCircle2 } from 'lucide-react';

export const ValueBadges: React.FC = () => {
  const badges = [
    { label: 'Free Workshop', icon: Sparkles, color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400' },
    { label: 'Online Workshop', icon: CheckCircle2, color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400' },
    { label: '60 Minutes', icon: Clock, color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400' },
    { label: 'Hands-on Project', icon: Code, color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto my-6">
      {badges.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r ${item.color} border backdrop-blur-md shadow-sm transition-transform duration-200 hover:scale-[1.02]`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};
