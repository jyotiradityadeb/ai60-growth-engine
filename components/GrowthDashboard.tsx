'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Share2, 
  TrendingUp, 
  MousePointerClick, 
  CopyX, 
  Clock, 
  Layers, 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { registrationService, GrowthDataSummary } from '@/lib/registration-service';
const LIVE_TEST_DATA_TAG = 'LIVE TEST DATA';

export const GrowthDashboard: React.FC = () => {
  const [data, setData] = useState<GrowthDataSummary | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    registrationService.getGrowthSummary().then(setData).catch(() => setLoadError(true));
  }, []);

  if (loadError) return <div className="p-8 text-center text-rose-300">Live analytics are unavailable. Check the Supabase setup.</div>;
  if (!data) return <div className="p-8 text-center text-slate-400">Loading live analytics…</div>;

  const { kpis, acquisitionSources, campusConnectors, dailyTrend, recentRegistrations, campusLeaderboard, studentReferrers } = data;

  // Chart data configurations
  const sourceChartData = acquisitionSources.map(s => ({
    name: s.source.split(' ')[0], // Short name
    fullName: s.source,
    registrations: s.registrations,
    clicks: s.clicks,
  }));

  const campusChartData = campusLeaderboard.slice(0, 6).map(c => ({
    name: c.college.split(' ')[0], // Short name
    fullName: c.college,
    registrations: c.registrations,
    referrals: c.referralRegistrations,
  }));

  const pieData = [
    { name: 'Referral Registrations', value: kpis.referralRegistrations, color: '#06b6d4' },
    { name: 'Direct & Campus Clubs', value: kpis.verifiedRegistrations - kpis.referralRegistrations, color: '#3b82f6' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-8">
      
      {/* Simulation Banner Notice */}
      <div className="text-xs font-mono text-emerald-300">LIVE TEST DATA — database registrations only</div>

      {/* Header & Top Label */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              AI60 Campaign Control Room
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Growth Acquisition Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            7-Day Campaign Simulation • Free AI Workshop • Target: 500 Registrations • Budget: ₹2,000
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            Progress: <strong className="text-cyan-400">{kpis.verifiedRegistrations} / {kpis.registrationGoal}</strong> ({Math.round((kpis.verifiedRegistrations / kpis.registrationGoal) * 100)}%)
          </div>
        </div>
      </div>

      {/* 6 KPI CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* KPI 1: Verified Registrations */}
        <div className="glass-card rounded-2xl p-4 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-medium uppercase">Verified Regs</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{kpis.verifiedRegistrations}</div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>Goal: {kpis.registrationGoal}</span>
            <span className="text-cyan-400 font-bold">{Math.round((kpis.verifiedRegistrations / kpis.registrationGoal) * 100)}%</span>
          </div>
        </div>

        {/* KPI 2: Colleges Reached */}
        <div className="glass-card rounded-2xl p-4 border border-blue-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-medium uppercase">Colleges Reached</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{kpis.collegesReached}</div>
          <div className="text-[10px] text-slate-400">Engineering Campuses</div>
        </div>

        {/* KPI 3: Referral Registrations */}
        <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-medium uppercase">Referral Regs</span>
            <Share2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-300 font-mono">{kpis.referralRegistrations}</div>
          <div className="text-[10px] text-emerald-400/80">Viral Acquisition</div>
        </div>

        {/* KPI 4: Referral Contribution % */}
        <div className="glass-card rounded-2xl p-4 border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-medium uppercase">Referral Share</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300 font-mono">{kpis.referralContributionPercent}%</div>
          <div className="text-[10px] text-slate-400">K-Factor Driven</div>
        </div>

        {/* KPI 5: Conversion Rate */}
        <div className="glass-card rounded-2xl p-4 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-medium uppercase">Click → Reg Conv</span>
            <MousePointerClick className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-base font-bold text-amber-300">Not tracked</div>
          <div className="text-[10px] text-slate-400">Click tracking not enabled</div>
        </div>

        {/* KPI 6: Duplicate Registrations */}
        <div className="glass-card rounded-2xl p-4 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-medium uppercase">Filtered Dups</span>
            <CopyX className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-base font-bold text-slate-300">Not tracked</div>
          <div className="text-[10px] text-rose-400/80">Duplicate emails rejected</div>
        </div>

      </div>

      {/* CHARTS GRID 1: Daily Trend & Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Daily Registration Trend (7 Days) */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">Daily Registration Trend</h3>
              <p className="text-xs text-slate-400">7-Day acquisition progression (Direct vs Referral)</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{LIVE_TEST_DATA_TAG}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReferral" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="direct" name="Direct Regs" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDirect)" />
                <Area type="monotone" dataKey="referral" name="Referral Regs" stroke="#06b6d4" fillOpacity={1} fill="url(#colorReferral)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Registrations by Acquisition Source */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">Registrations by Acquisition Source</h3>
              <p className="text-xs text-slate-400">Breakdown of growth channels</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{LIVE_TEST_DATA_TAG}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="registrations" name="Registrations" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* CHARTS GRID 2: Campus Breakdown & Direct vs Referral Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 3: Registrations by Top Campus */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">Registrations by Campus</h3>
              <p className="text-xs text-slate-400">Top engineering institutions by volume</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{LIVE_TEST_DATA_TAG}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campusChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="registrations" name="Total Regs" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="referrals" name="Referral Regs" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Direct vs Referral Share */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">Direct vs Referral</h3>
              <p className="text-xs text-slate-400">Viral expansion ratio</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{LIVE_TEST_DATA_TAG}</span>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{item.value} ({Math.round((item.value / kpis.verifiedRegistrations) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TABLES SECTION 1: Acquisition Sources & Campus Connectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Table 1: Top Acquisition Sources */}
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <h2 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>TOP ACQUISITION SOURCES</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-400">{LIVE_TEST_DATA_TAG} • clicks untracked</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Source Channel</th>
                  <th className="px-4 py-3 text-right">Clicks</th>
                  <th className="px-4 py-3 text-right">Registrations</th>
                  <th className="px-4 py-3 text-right">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {acquisitionSources.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-white">{item.source}</td>
                    <td className="px-4 py-3.5 text-right font-mono text-slate-400">—</td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-cyan-300">{item.registrations}</td>
                    <td className="px-4 py-3.5 text-right font-mono text-emerald-400">{item.conversionRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Top Campus Connectors */}
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <h2 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>TOP CAMPUS CONNECTORS</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-400">{LIVE_TEST_DATA_TAG}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Campus / Partner Group</th>
                  <th className="px-4 py-3 text-right">Registrations</th>
                  <th className="px-4 py-3 text-right">Referral Regs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {campusConnectors.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-white">{item.campus}</td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-cyan-300">{item.registrations}</td>
                    <td className="px-4 py-3.5 text-right font-mono text-emerald-400 font-semibold">+{item.referralRegistrations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h2 className="font-bold text-base text-white">TOP REFERRERS</h2>
          <span className="text-xs font-mono text-slate-400">{LIVE_TEST_DATA_TAG}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr><th className="px-6 py-3">Student</th><th className="px-6 py-3">College</th><th className="px-6 py-3 text-right">Referrals</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {studentReferrers.slice(0, 10).map(referrer => <tr key={referrer.id}>
                <td className="px-6 py-3 font-semibold text-white">{referrer.name}</td>
                <td className="px-6 py-3">{referrer.college}</td>
                <td className="px-6 py-3 text-right font-mono text-emerald-300">{referrer.successfulReferrals}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* LATEST REGISTRATIONS TABLE */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h2 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>LATEST REGISTRATIONS LOG</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">{LIVE_TEST_DATA_TAG}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">College</th>
                <th className="px-6 py-3.5">Source Channel</th>
                <th className="px-6 py-3.5">Referral Code</th>
                <th className="px-6 py-3.5">Referred By</th>
                <th className="px-6 py-3.5 text-right">Registered At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{reg.fullName}</div>
                  </td>
                  <td className="px-6 py-4 text-xs sm:text-sm text-slate-300">{reg.college}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-700 text-cyan-300">
                      {reg.acquisitionSource}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-cyan-400 font-semibold text-xs">{reg.referralCode}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">
                    {reg.referredByCode ? (
                      <span className="text-emerald-400 font-semibold">{reg.referredByCode}</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-xs text-slate-400">{reg.registeredAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
