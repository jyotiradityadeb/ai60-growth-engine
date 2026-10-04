import React, { Suspense } from 'react';
import { SuccessCard } from '@/components/SuccessCard';
import { getSupabaseServer } from '@/lib/supabase-server';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ code?: string | string[] }> }) {
  const params = await searchParams;
  const code = typeof params.code === 'string' && /^AI60-[A-Z0-9]{9}$/.test(params.code) ? params.code : null;
  if (!code) return <div className="py-20 text-center text-slate-300">No completed registration found. Please register first.</div>;
  let exists = false;
  let unavailable = false;
  try {
    const { data, error } = await getSupabaseServer().from('registrations').select('id').eq('referral_code', code).maybeSingle();
    if (error) throw error;
    exists = Boolean(data);
  } catch {
    unavailable = true;
  }
  if (unavailable) return <div className="py-20 text-center text-rose-300">Registration confirmation is temporarily unavailable.</div>;
  if (!exists) return <div className="py-20 text-center text-slate-300">No completed registration found. Please register first.</div>;
  return (
    <div className="py-12 px-4">
      <Suspense fallback={
        <div className="text-center py-20 text-slate-400 font-mono text-sm">
          Loading referral workspace...
        </div>
      }>
        <SuccessCard referralCodeFromQuery={code} />
      </Suspense>
    </div>
  );
}
