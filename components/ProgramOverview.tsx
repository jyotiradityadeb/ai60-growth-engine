import React from 'react';
import { Lightbulb, Wrench, Rocket, Briefcase } from 'lucide-react';

export const ProgramOverview: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Understand the AI Project',
      desc: 'Break down real-world AI architecture, prompt engineering, and LLM API integrations in plain English.',
      icon: Lightbulb,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      num: '02',
      title: 'Build It Step by Step',
      desc: 'Follow along live as we write clean code, handle API requests, and connect frontend logic in 60 minutes.',
      icon: Wrench,
      color: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30',
    },
    {
      num: '03',
      title: 'Finish With Something Working',
      desc: 'Deploy a functional AI project to your GitHub portfolio that you can showcase live to interviewers.',
      icon: Rocket,
      color: 'from-indigo-500/20 to-purple-500/10 text-purple-400 border-indigo-500/30',
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto my-16 space-y-12">
      
      {/* WHAT YOU'LL DO Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            WORKSHOP ROADMAP
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            WHAT YOU’LL DO
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            A structured 60-minute hands-on build session designed specifically for engineering students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border relative group hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-500">{step.num}</span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} border flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* WHY IT MATTERS Section */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-indigo-500/30 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/10">
            <Briefcase className="w-7 h-7" />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                PLACEMENT RELEVANCE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              WHY IT MATTERS
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              “Many students use AI tools, but few have built an AI project they can actually explain during placements.”
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Standing out in placement technical interviews requires proof of implementation — knowing how data flows, API keys are secured, and how components interact under the hood.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
