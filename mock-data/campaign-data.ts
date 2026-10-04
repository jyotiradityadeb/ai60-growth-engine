import { 
  CampaignKPIs, 
  StudentReferrer, 
  CampusLeaderboardItem, 
  AcquisitionSourceMetric, 
  CampusConnectorMetric, 
  DailyTrendPoint,
  StudentRegistration 
} from '@/types';

export const DEMO_DATA_TAG = "DEMO DATA — CAMPAIGN SIMULATION";

export const INITIAL_KPIS: CampaignKPIs = {
  verifiedRegistrations: 342,
  registrationGoal: 500,
  collegesReached: 28,
  referralRegistrations: 128,
  referralContributionPercent: 37.4,
  conversionRatePercent: 18.2,
  totalClicks: 1879,
  duplicateRegistrations: 14,
  campaignBudgetINR: 2000,
  campaignDurationDays: 7,
};

export const INITIAL_STUDENT_REFERRERS: StudentReferrer[] = [
  { rank: 1, id: 'ref-1', name: 'Aarav Sharma', college: 'MSRIT Bangalore', successfulReferrals: 18, referralCode: 'AI60-AS18' },
  { rank: 2, id: 'ref-2', name: 'Priya Venkatesh', college: 'RVCE Bangalore', successfulReferrals: 15, referralCode: 'AI60-PV15' },
  { rank: 3, id: 'ref-3', name: 'Rohan Gupta', college: 'BMSCE Bangalore', successfulReferrals: 12, referralCode: 'AI60-RG12' },
  { rank: 4, id: 'ref-4', name: 'Sneha Reddy', college: 'VIT Vellore', successfulReferrals: 11, referralCode: 'AI60-SR11' },
  { rank: 5, id: 'ref-5', name: 'Karthik Raja', college: 'NIT Trichy', successfulReferrals: 9, referralCode: 'AI60-KR09' },
  { rank: 6, id: 'ref-6', name: 'Ananya Deshmukh', college: 'COEP Pune', successfulReferrals: 8, referralCode: 'AI60-AD08' },
  { rank: 7, id: 'ref-7', name: 'Vikram Joshi', college: 'IIT Bombay', successfulReferrals: 7, referralCode: 'AI60-VJ07' },
  { rank: 8, id: 'ref-8', name: 'Divya Nair', college: 'PES University Bangalore', successfulReferrals: 6, referralCode: 'AI60-DN06' },
  { rank: 9, id: 'ref-9', name: 'Nikhil Saxena', college: 'SRM Chennai', successfulReferrals: 5, referralCode: 'AI60-NS05' },
  { rank: 10, id: 'ref-10', name: 'Meera Iyer', college: 'PSG Tech Coimbatore', successfulReferrals: 4, referralCode: 'AI60-MI04' },
];

export const INITIAL_CAMPUS_LEADERBOARD: CampusLeaderboardItem[] = [
  { rank: 1, college: 'MSRIT Bangalore', registrations: 68, referralRegistrations: 28 },
  { rank: 2, college: 'RVCE Bangalore', registrations: 54, referralRegistrations: 22 },
  { rank: 3, college: 'BMSCE Bangalore', registrations: 46, referralRegistrations: 19 },
  { rank: 4, college: 'VIT Vellore', registrations: 38, referralRegistrations: 15 },
  { rank: 5, college: 'PES University', registrations: 32, referralRegistrations: 12 },
  { rank: 6, college: 'NIT Trichy', registrations: 27, referralRegistrations: 10 },
  { rank: 7, college: 'COEP Pune', registrations: 24, referralRegistrations: 8 },
  { rank: 8, college: 'SRM Kattankulathur', registrations: 21, referralRegistrations: 6 },
  { rank: 9, college: 'IIT Bombay', registrations: 18, referralRegistrations: 5 },
  { rank: 10, college: 'PSG College of Technology', registrations: 14, referralRegistrations: 3 },
];

export const INITIAL_ACQUISITION_SOURCES: AcquisitionSourceMetric[] = [
  { source: 'WhatsApp Communities', sourceKey: 'whatsapp-community', clicks: 712, registrations: 142, conversionRate: '19.9%' },
  { source: 'Referrals (Peer-to-Peer)', sourceKey: 'referrals', clicks: 485, registrations: 128, conversionRate: '26.4%' },
  { source: 'Campus Clubs & Leads', sourceKey: 'campus-club', clicks: 390, registrations: 52, conversionRate: '13.3%' },
  { source: 'LinkedIn Student Posts', sourceKey: 'linkedin', clicks: 194, registrations: 14, conversionRate: '7.2%' },
  { source: 'Email Outbound', sourceKey: 'email', clicks: 98, registrations: 6, conversionRate: '6.1%' },
];

export const INITIAL_CAMPUS_CONNECTORS: CampusConnectorMetric[] = [
  { campus: 'MSRIT ACM / IEEE Club', registrations: 68, referralRegistrations: 28 },
  { campus: 'RVCE AI/Coding Club', registrations: 54, referralRegistrations: 22 },
  { campus: 'BMSCE Placement Cell', registrations: 46, referralRegistrations: 19 },
  { campus: 'VIT Developer Group', registrations: 38, referralRegistrations: 15 },
  { campus: 'PES Tech Circle', registrations: 32, referralRegistrations: 12 },
  { campus: 'NIT Trichy Technical Council', registrations: 27, referralRegistrations: 10 },
];

export const INITIAL_DAILY_TREND: DailyTrendPoint[] = [
  { day: 'Day 1', date: 'Sep 28', direct: 18, referral: 4, total: 22 },
  { day: 'Day 2', date: 'Sep 29', direct: 26, referral: 11, total: 37 },
  { day: 'Day 3', date: 'Sep 30', direct: 31, referral: 19, total: 50 },
  { day: 'Day 4', date: 'Oct 01', direct: 38, referral: 24, total: 62 },
  { day: 'Day 5', date: 'Oct 02', direct: 42, referral: 28, total: 70 },
  { day: 'Day 6', date: 'Oct 03', direct: 34, referral: 25, total: 59 },
  { day: 'Day 7 (Today)', date: 'Oct 04', direct: 25, referral: 17, total: 42 },
];

export const INITIAL_RECENT_REGISTRATIONS: StudentRegistration[] = [
  {
    id: 'reg-342',
    fullName: 'Siddharth Varma',
    email: 'siddharth.v@msrit.edu',
    phoneNumber: '+91 98765 43210',
    college: 'MSRIT Bangalore',
    branch: 'Computer Science & Engineering',
    graduationYear: 2027,
    referralCode: 'AI60-SV42',
    referredByCode: 'AI60-AS18',
    acquisitionSource: 'referrals',
    acquisitionCampus: 'MSRIT Bangalore',
    registeredAt: '2 mins ago',
  },
  {
    id: 'reg-341',
    fullName: 'Ananya Sharma',
    email: 'ananya.s@rvce.edu.in',
    phoneNumber: '+91 98123 45678',
    college: 'RVCE Bangalore',
    branch: 'Artificial Intelligence & Data Science',
    graduationYear: 2027,
    referralCode: 'AI60-AS41',
    referredByCode: 'AI60-PV15',
    acquisitionSource: 'referrals',
    acquisitionCampus: 'RVCE Bangalore',
    registeredAt: '8 mins ago',
  },
  {
    id: 'reg-340',
    fullName: 'Chirag Kulkarni',
    email: 'chirag.k@bmsce.ac.in',
    phoneNumber: '+91 97654 32109',
    college: 'BMSCE Bangalore',
    branch: 'Information Science & Engineering',
    graduationYear: 2027,
    referralCode: 'AI60-CK40',
    referredByCode: undefined,
    acquisitionSource: 'whatsapp-community',
    acquisitionCampus: 'BMSCE Bangalore',
    registeredAt: '15 mins ago',
  },
  {
    id: 'reg-339',
    fullName: 'Tanvi Agarwal',
    email: 'tanvi.a@vit.ac.in',
    phoneNumber: '+91 96543 21098',
    college: 'VIT Vellore',
    branch: 'Electronics & Communication',
    graduationYear: 2027,
    referralCode: 'AI60-TA39',
    referredByCode: 'AI60-SR11',
    acquisitionSource: 'referrals',
    acquisitionCampus: 'VIT Vellore',
    registeredAt: '24 mins ago',
  },
  {
    id: 'reg-338',
    fullName: 'Harish Mehta',
    email: 'harish.m@nitt.edu',
    phoneNumber: '+91 95432 10987',
    college: 'NIT Trichy',
    branch: 'Electrical & Electronics Engineering',
    graduationYear: 2027,
    referralCode: 'AI60-HM38',
    referredByCode: undefined,
    acquisitionSource: 'campus-club',
    acquisitionCampus: 'NIT Trichy',
    registeredAt: '42 mins ago',
  },
];

export const POPULAR_COLLEGES = [
  'MSRIT Bangalore',
  'RVCE Bangalore',
  'BMSCE Bangalore',
  'PES University Bangalore',
  'VIT Vellore',
  'SRM Institute of Science and Technology',
  'IIT Bombay',
  'NIT Trichy',
  'COEP Technological University Pune',
  'PSG College of Technology Coimbatore',
  'BITS Pilani',
  'Manipal Institute of Technology',
  'Thapar Institute of Engineering & Tech',
  'VJT Mumbai',
];

export const BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Information Science & Engineering (ISE/IT)',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other Engineering Branch',
];
