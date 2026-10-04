export interface StudentRegistration {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  college: string;
  branch: string;
  graduationYear: number;
  referralCode: string;
  referredByCode?: string;
  acquisitionSource: 'campus-club' | 'referrals' | 'whatsapp-community' | 'email' | 'linkedin' | 'direct';
  acquisitionCampus?: string;
  registeredAt: string;
}

export interface AttributionParams {
  source: string | null;
  campus: string | null;
  ref: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export interface StudentReferrer {
  rank: number;
  id: string;
  name: string;
  college: string;
  successfulReferrals: number;
  referralCode: string;
}

export interface CampusLeaderboardItem {
  rank: number;
  college: string;
  registrations: number;
  referralRegistrations: number;
}

export interface AcquisitionSourceMetric {
  source: string;
  sourceKey: string;
  clicks: number;
  registrations: number;
  conversionRate: string;
}

export interface CampusConnectorMetric {
  campus: string;
  registrations: number;
  referralRegistrations: number;
}

export interface CampaignKPIs {
  verifiedRegistrations: number;
  registrationGoal: number;
  collegesReached: number;
  referralRegistrations: number;
  referralContributionPercent: number;
  conversionRatePercent: number;
  totalClicks: number;
  duplicateRegistrations: number;
  campaignBudgetINR: number;
  campaignDurationDays: number;
}

export interface DailyTrendPoint {
  day: string;
  date: string;
  direct: number;
  referral: number;
  total: number;
}
