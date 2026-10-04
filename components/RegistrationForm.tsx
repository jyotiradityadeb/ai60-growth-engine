'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, GraduationCap, BookOpen, Calendar, ArrowRight, Sparkles, CheckCircle, Tag } from 'lucide-react';
import { POPULAR_COLLEGES, BRANCHES } from '@/mock-data/campaign-data';
import { captureAndStoreAttribution } from '@/lib/attribution';
import { registrationService } from '@/lib/registration-service';
import { AttributionParams } from '@/types';

export const RegistrationForm: React.FC = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [college, setCollege] = useState('');
  const [customCollege, setCustomCollege] = useState('');
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [graduationYear, setGraduationYear] = useState<number>(2027); // Default 2027 as requested!

  const [attribution, setAttribution] = useState<AttributionParams>({
    source: null,
    campus: null,
    ref: null,
    utm_medium: null,
    utm_campaign: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const attr = captureAndStoreAttribution();
    queueMicrotask(() => {
      setAttribution(attr);
      if (attr.campus && POPULAR_COLLEGES.includes(attr.campus)) setCollege(attr.campus);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const finalCollege = college === 'other' ? customCollege.trim() : college;

    if (!fullName.trim()) return setFormError('Please enter your full name');
    if (!email.trim() || !email.includes('@')) return setFormError('Please enter a valid email address');
    if (!phoneNumber.trim() || phoneNumber.length < 10) return setFormError('Please enter a valid 10-digit phone number');
    if (!finalCollege) return setFormError('Please select or specify your college / university');

    setIsSubmitting(true);

    try {
      const result = await registrationService.registerStudent({
        fullName,
        email,
        phoneNumber,
        college: finalCollege,
        branch,
        graduationYear,
        referredByCode: attribution.ref,
        acquisitionSource: attribution.source,
        acquisitionCampus: attribution.campus || finalCollege,
      });

      if (result.success && result.referralCode) {
        // Redirect to Page 2 Success screen
        router.push(`/success?code=${encodeURIComponent(result.referralCode!)}`);
      } else {
        setFormError(result.error || 'Failed to submit registration. Please try again.');
        setIsSubmitting(false);
      }
    } catch {
      setFormError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div id="register-form" className="w-full max-w-xl mx-auto">
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
        
        {/* Glow backdrop accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="space-y-1 mb-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> FREE SPOTS LIMITED FOR BATCH
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-2">
            Reserve My Free Spot
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Takes under 45 seconds. Get instant access + your referral link.
          </p>

          {/* Active Attribution Badge if referred */}
          {attribution.ref && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Tag className="w-3.5 h-3.5 shrink-0" />
              <span>Attributed via referral code: <strong>{attribution.ref}</strong></span>
            </div>
          )}
        </div>

        {formError && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {formError}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>
          </div>

          {/* Email & Phone grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@college.edu"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Phone Number (WhatsApp) <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>
            </div>
          </div>

          {/* College / University */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              College / University <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <select
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition appearance-none"
              >
                <option value="" disabled>Select your College / University</option>
                {POPULAR_COLLEGES.map((c, i) => (
                  <option key={i} value={c} className="bg-slate-900 text-white">{c}</option>
                ))}
                <option value="other" className="bg-slate-900 text-white">+ Other College / University</option>
              </select>
            </div>
          </div>

          {/* Custom college input if other is selected */}
          {college === 'other' && (
            <div>
              <input
                type="text"
                required
                value={customCollege}
                onChange={(e) => setCustomCollege(e.target.value)}
                placeholder="Enter full college name"
                className="w-full bg-slate-900/90 border border-cyan-500/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>
          )}

          {/* Branch & Graduation Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Branch */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Branch / Specialization <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition appearance-none"
                >
                  {BRANCHES.map((b, i) => (
                    <option key={i} value={b} className="bg-slate-900 text-white">{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Graduation Year - Default 2027 */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Grad Year <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                <select
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(Number(e.target.value))}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition appearance-none font-mono"
                >
                  <option value={2027}>2027 (Final Year)</option>
                  <option value={2026}>2026</option>
                  <option value={2028}>2028</option>
                  <option value={2025}>2025</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Reserving Spot...</span>
                </>
              ) : (
                <>
                  <span>Reserve My Free Spot</span>
                  <ArrowRight className="w-5 h-5 text-cyan-200" />
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-1">
            <span className="text-[11px] text-slate-400 inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Instant confirmation & referral dashboard link
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};
