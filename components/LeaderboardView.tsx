'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Building2, Users, Medal } from 'lucide-react';
import { registrationService, GrowthDataSummary } from '@/lib/registration-service';
const LIVE_TEST_DATA_TAG = 'LIVE TEST DATA';

export const LeaderboardView: React.FC = () => {
  const [data, setData] = useState<GrowthDataSummary | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [activeTab, setActiveTab] = useState<'students' | 'campuses'>('students');

  useEffect(() => {
    registrationService.getGrowthSummary().then(setData).catch(() => setLoadError(true));
  }, []);

  if (loadError) return <div className="p-8 text-center text-rose-300">Live leaderboard is unavailable. Check the Supabase setup.</div>;
  if (!data) return <div className="p-8 text-center text-slate-400">Loading live leaderboard…</div>;

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 space-y-8">
      
      {/* Simulation Banner Notice */}
      <div className="text-xs font-mono text-emerald-300">LIVE TEST DATA — database registrations only</div>

      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>VIRAL GROWTH RANKINGS</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI60 Campaign Leaderboard
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Tracking student referrals and campus registrations from live test submissions.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex gap-2 w-full max-w-md">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Top Student Referrers</span>
          </button>

          <button
            onClick={() => setActiveTab('campuses')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'campuses'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Top Campuses</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TOP STUDENT REFERRERS */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.studentReferrers.slice(0, 3).map((item, idx) => {
              const podiumColors = [
                { border: 'border-amber-400/50', bg: 'from-amber-500/15 via-slate-900 to-slate-950', badge: 'bg-amber-400 text-slate-950', iconColor: 'text-amber-400' },
                { border: 'border-slate-300/40', bg: 'from-slate-400/10 via-slate-900 to-slate-950', badge: 'bg-slate-300 text-slate-950', iconColor: 'text-slate-300' },
                { border: 'border-amber-700/40', bg: 'from-amber-700/10 via-slate-900 to-slate-950', badge: 'bg-amber-700 text-white', iconColor: 'text-amber-600' },
              ][idx];

              return (
                <div
                  key={item.id}
                  className={`glass-card rounded-2xl p-5 border ${podiumColors.border} bg-gradient-to-b ${podiumColors.bg} relative overflow-hidden flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`w-8 h-8 rounded-full ${podiumColors.badge} font-black text-sm flex items-center justify-center shadow-md`}>
                      #{item.rank}
                    </span>
                    <Medal className={`w-6 h-6 ${podiumColors.iconColor}`} />
                  </div>

                  <div className="mt-4 space-y-1">
                    <h3 className="font-bold text-lg text-white tracking-tight">{item.name}</h3>
                    <p className="text-xs text-slate-400 truncate">{item.college}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">{item.referralCode}</span>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-cyan-300">{item.successfulReferrals}</span>
                      <span className="text-[10px] text-slate-400 block font-medium">Referrals</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Students Table */}
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <h2 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>TOP STUDENT REFERRERS</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">{LIVE_TEST_DATA_TAG}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/80 text-xs text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Rank</th>
                    <th className="px-6 py-3.5">Student</th>
                    <th className="px-6 py-3.5">College</th>
                    <th className="px-6 py-3.5 text-right">Successful Referrals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.studentReferrers.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-300">
                        {item.rank <= 3 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs">
                            {item.rank}
                          </span>
                        ) : (
                          `#${item.rank}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{item.referralCode}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs sm:text-sm">{item.college}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-cyan-300 text-base font-mono">{item.successfulReferrals}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: TOP CAMPUSES */}
      {activeTab === 'campuses' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <h2 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>TOP CAMPUSES</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">{LIVE_TEST_DATA_TAG}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/80 text-xs text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Rank</th>
                    <th className="px-6 py-3.5">College / Institution</th>
                    <th className="px-6 py-3.5 text-right">Direct & Club Regs</th>
                    <th className="px-6 py-3.5 text-right">Referral Regs</th>
                    <th className="px-6 py-3.5 text-right">Total Registrations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.campusLeaderboard.map((item) => (
                    <tr key={item.college} className="hover:bg-slate-900/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-300">
                        #{item.rank}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        {item.college}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 font-mono">
                        {item.registrations - item.referralRegistrations}
                      </td>
                      <td className="px-6 py-4 text-right text-emerald-400 font-mono font-semibold">
                        +{item.referralRegistrations}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-cyan-300 text-base font-mono">
                        {item.registrations}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
