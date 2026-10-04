import type { StudentRegistration, CampaignKPIs, StudentReferrer, CampusLeaderboardItem, AcquisitionSourceMetric, CampusConnectorMetric, DailyTrendPoint } from '@/types';

export interface RegistrationInput {
  fullName: string; email: string; phoneNumber: string; college: string; branch: string;
  graduationYear: number; referredByCode?: string | null; acquisitionSource?: string | null; acquisitionCampus?: string | null;
}
export interface RegistrationResult { success: boolean; referralCode?: string; error?: string }
export interface GrowthDataSummary {
  kpis: CampaignKPIs; studentReferrers: StudentReferrer[]; campusLeaderboard: CampusLeaderboardItem[];
  acquisitionSources: AcquisitionSourceMetric[]; campusConnectors: CampusConnectorMetric[];
  dailyTrend: DailyTrendPoint[]; recentRegistrations: StudentRegistration[];
}

export const registrationService = {
  async registerStudent(input: RegistrationInput): Promise<RegistrationResult> {
    try {
      const response = await fetch('/api/registrations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
      return await response.json();
    } catch { return { success: false, error: 'Registration is temporarily unavailable. Please try again.' }; }
  },
  async getGrowthSummary(): Promise<GrowthDataSummary> {
    const response = await fetch('/api/analytics', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load live data.');
    return response.json();
  },
};
