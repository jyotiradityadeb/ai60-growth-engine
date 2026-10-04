import type { GrowthDataSummary } from './registration-service';

export interface RegistrationRow {
  id: string; full_name: string; college: string; source: string | null; campus_code: string | null;
  referral_code: string; referred_by: string | null; created_at: string;
}

export function calculateAnalytics(rows: RegistrationRow[]): GrowthDataSummary {
  const codes = new Map(rows.map(row => [row.referral_code, row]));
  const referrals = rows.filter(row => row.referred_by && row.referred_by !== row.referral_code && codes.has(row.referred_by));
  const refCounts = new Map<string, number>();
  referrals.forEach(row => refCounts.set(row.referred_by!, (refCounts.get(row.referred_by!) || 0) + 1));
  const studentReferrers = [...refCounts.entries()].map(([code, count]) => {
    const owner = codes.get(code)!;
    return { rank: 0, id: owner.id, name: owner.full_name.trim().split(/\s+/)[0], college: owner.college, successfulReferrals: count, referralCode: code };
  }).sort((a, b) => b.successfulReferrals - a.successfulReferrals).map((item, index) => ({ ...item, rank: index + 1 }));
  const campusMap = new Map<string, { college: string; registrations: number; referralRegistrations: number }>();
  const sourceMap = new Map<string, number>();
  const dayMap = new Map<string, { direct: number; referral: number }>();
  const connectorMap = new Map<string, { registrations: number; referralRegistrations: number }>();
  for (const row of rows) {
    const isReferral = Boolean(row.referred_by && codes.has(row.referred_by) && row.referred_by !== row.referral_code);
    const campusKey = row.college.trim().toLocaleLowerCase();
    const campus = campusMap.get(campusKey) || { college: row.college, registrations: 0, referralRegistrations: 0 };
    campus.registrations++; if (isReferral) campus.referralRegistrations++;
    campusMap.set(campusKey, campus);
    const source = row.source || 'direct'; sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
    const date = row.created_at.slice(0, 10);
    const day = dayMap.get(date) || { direct: 0, referral: 0 };
    if (isReferral) day.referral++; else day.direct++;
    dayMap.set(date, day);
    if (row.campus_code) {
      const connector = connectorMap.get(row.campus_code) || { registrations: 0, referralRegistrations: 0 };
      connector.registrations++; if (isReferral) connector.referralRegistrations++;
      connectorMap.set(row.campus_code, connector);
    }
  }
  const campusLeaderboard = [...campusMap.values()].sort((a, b) => b.registrations - a.registrations).map((item, index) => ({ ...item, rank: index + 1 }));
  const acquisitionSources = [...sourceMap.entries()].map(([source, registrations]) => ({ source, sourceKey: source, clicks: 0, registrations, conversionRate: '—' })).sort((a,b) => b.registrations - a.registrations);
  const campusConnectors = [...connectorMap.entries()].map(([campus, counts]) => ({ campus, ...counts })).sort((a,b) => b.registrations - a.registrations);
  const dailyTrend = [...dayMap.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([date, counts], index) => ({ day: `Day ${index + 1}`, date, ...counts, total: counts.direct + counts.referral }));
  const recentRegistrations = [...rows].sort((a,b) => b.created_at.localeCompare(a.created_at)).slice(0, 15).map(row => ({
    id: row.id, fullName: row.full_name.trim().split(/\s+/)[0], college: row.college,
    branch: '', graduationYear: 0, referralCode: row.referral_code, referredByCode: row.referred_by || undefined,
    acquisitionSource: (row.source || 'direct') as GrowthDataSummary['recentRegistrations'][number]['acquisitionSource'],
    acquisitionCampus: row.campus_code || undefined, registeredAt: new Date(row.created_at).toLocaleDateString('en-IN'),
  }));
  const kpis = {
    verifiedRegistrations: rows.length, registrationGoal: 500, collegesReached: campusMap.size,
    referralRegistrations: referrals.length, referralContributionPercent: rows.length ? Number((referrals.length / rows.length * 100).toFixed(1)) : 0,
    conversionRatePercent: 0, totalClicks: 0, duplicateRegistrations: 0, campaignBudgetINR: 2000, campaignDurationDays: 7,
  };
  return { kpis, studentReferrers, campusLeaderboard, acquisitionSources, campusConnectors, dailyTrend, recentRegistrations };
}
