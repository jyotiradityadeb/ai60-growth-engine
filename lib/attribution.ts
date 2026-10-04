import type { AttributionParams } from '@/types';

const STORAGE_KEY = 'ai60_campaign_attribution';
const empty: AttributionParams = { source: null, campus: null, ref: null, utm_medium: null, utm_campaign: null };

export function getAttributionFromUrl(input?: string | URLSearchParams): AttributionParams {
  const params = input instanceof URLSearchParams ? input : new URLSearchParams(input ?? (typeof window === 'undefined' ? '' : window.location.search));
  const value = (key: string) => params.get(key)?.trim() || null;
  return {
    source: value('source'), campus: value('campus'),
    ref: value('ref') || value('referral') || value('referralCode'),
    utm_medium: value('utm_medium'), utm_campaign: value('utm_campaign'),
  };
}

export function captureAndStoreAttribution(): AttributionParams {
  if (typeof window === 'undefined') return empty;
  const current = getAttributionFromUrl();
  let stored = empty;
  try { stored = { ...empty, ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') }; } catch { /* Ignore corrupt storage. */ }
  const updated: AttributionParams = {
    source: current.source || stored.source || 'direct', campus: current.campus || stored.campus,
    ref: current.ref || stored.ref, utm_medium: current.utm_medium || stored.utm_medium,
    utm_campaign: current.utm_campaign || stored.utm_campaign,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function getStoredAttribution(): AttributionParams {
  if (typeof window === 'undefined') return { ...empty, source: 'direct' };
  try { return { ...empty, ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') }; }
  catch { return captureAndStoreAttribution(); }
}

export function generateReferralCode(fullName: string): string {
  const letters = fullName.trim().split(/\s+/).map(part => part[0] || '').join('').replace(/[^a-z]/gi, '').slice(0, 2).toUpperCase().padEnd(2, 'X');
  const bytes = new Uint8Array(7);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, byte => (byte % 36).toString(36).toUpperCase()).join('');
  return `AI60-${letters}${suffix}`;
}

export function getReferralUrl(referralCode: string): string {
  const origin = typeof window === 'undefined' ? (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') : window.location.origin;
  const url = new URL('/', origin);
  url.searchParams.set('ref', referralCode);
  url.searchParams.set('source', 'referrals');
  return url.toString();
}
