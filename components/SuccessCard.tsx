'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Copy, Trophy, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { getReferralUrl } from '@/lib/attribution';

interface SuccessCardProps {
  referralCodeFromQuery?: string | null;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({ referralCodeFromQuery }) => {
  const searchParams = useSearchParams();
  const codeParam = referralCodeFromQuery || searchParams.get('code');

  const [copied, setCopied] = useState(false);
  const referralCode = codeParam && /^AI60-[A-Z0-9]{9}$/.test(codeParam) ? codeParam : null;
  if (!referralCode) return <div className="text-center text-slate-300 py-20">No completed registration found. Please register first.</div>;
  const inviteUrl = getReferralUrl(referralCode);

  const whatsappMessage = `I’m joining this free “Build Your First AI Project in 60 Minutes” workshop. Thought you might find it useful too 👇\n\n${inviteUrl}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl relative overflow-hidden text-center space-y-8">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Header Icon & Title */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce-short">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            You’re in! 🎉
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
            Your registration for the free 60-minute online workshop is confirmed.
          </p>
        </div>

        {/* Referral Card Container */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-6 text-left relative">
          
          {/* Badge */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> PERSONAL GROWTH INVITE LINK
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono">
              Attribute Enabled
            </span>
          </div>

          {/* Referral Code Display */}
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Your Referral Code</label>
            <div className="flex items-center justify-between bg-slate-950 px-4 py-3 rounded-xl border border-cyan-500/40 font-mono font-bold text-xl sm:text-2xl text-cyan-300 tracking-wider">
              <span>{referralCode}</span>
              <span className="text-xs font-sans font-normal text-slate-500 bg-slate-900 px-2 py-1 rounded">Unique ID</span>
            </div>
          </div>

          {/* Personal Invite Link */}
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Your Personal Invite Link</label>
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-300 font-mono px-2 focus:outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 shrink-0 transition"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* WhatsApp Sharing Callout */}
          <div className="space-y-2 pt-2">
            <p className="text-xs sm:text-sm font-semibold text-slate-200 text-center sm:text-left">
              Bring one friend who should build their first AI project too.
            </p>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed font-mono">
              <span className="text-emerald-400 font-bold block mb-1">WhatsApp Preview:</span>
              &ldquo;{whatsappMessage.split('\n\n')[0]}&rdquo;
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* Share on WhatsApp button */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Share on WhatsApp</span>
            </a>

            {/* Copy Referral Link Button */}
            <button
              onClick={handleCopyLink}
              className="py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Referral Link'}</span>
            </button>
          </div>

        </div>

        {/* View Leaderboard Banner CTA */}
        <div className="pt-2">
          <Link
            href="/leaderboard"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white font-bold text-sm hover:border-indigo-500/60 flex items-center justify-center gap-2 group transition-all"
          >
            <Trophy className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Check Live Campus & Student Leaderboard</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};
