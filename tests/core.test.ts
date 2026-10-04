import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateReferralCode, getAttributionFromUrl } from '../lib/attribution';
import { validateRegistration, isDuplicateEmailError } from '../lib/registration-validation';
import { calculateAnalytics, type RegistrationRow } from '../lib/analytics';

test('referral codes are readable, correctly shaped, and unique across a sample', () => {
  const codes = Array.from({ length: 1000 }, () => generateReferralCode('Aarav Sharma'));
  assert.equal(new Set(codes).size, codes.length);
  assert.ok(codes.every(code => /^AI60-AS[A-Z0-9]{7}$/.test(code)));
});

test('URL attribution parses all campaign dimensions', () => {
  assert.deepEqual(getAttributionFromUrl('?source=campus-club&campus=MSRIT&ref=AI60-AS12345'), {
    source: 'campus-club', campus: 'MSRIT', ref: 'AI60-AS12345', utm_medium: null, utm_campaign: null,
  });
});

test('registration normalizes email and rejects malformed referral', () => {
  const input = { fullName: 'Aarav Sharma', email: ' AARAV@EXAMPLE.COM ', phoneNumber: '9876543210', college: 'MSRIT', branch: 'CSE', graduationYear: 2027 };
  assert.equal(validateRegistration(input).data?.email, 'aarav@example.com');
  assert.equal(validateRegistration({ ...input, referredByCode: 'bad' }).error, 'Invalid referral code.');
});

test('database duplicate email error is identified', () => {
  assert.equal(isDuplicateEmailError({ code: '23505', message: 'duplicate key value violates unique constraint "registrations_email_key"' }), true);
  assert.equal(isDuplicateEmailError({ code: '23505', message: 'registrations_referral_code_key' }), false);
});

test('analytics counts only valid referrals and keeps totals separate', () => {
  const row = (id: string, code: string, referredBy: string | null, college: string, source: string): RegistrationRow => ({
    id, full_name: `Student ${id}`, college, source, campus_code: null, referral_code: code, referred_by: referredBy, created_at: `2026-10-0${id}T10:00:00Z`,
  });
  const summary = calculateAnalytics([
    row('1', 'AI60-ST00001', null, 'MSRIT', 'direct'),
    row('2', 'AI60-ST00002', 'AI60-ST00001', 'MSRIT', 'referrals'),
    row('3', 'AI60-ST00003', null, 'RVCE', 'email'),
  ]);
  assert.equal(summary.kpis.verifiedRegistrations, 3);
  assert.equal(summary.kpis.referralRegistrations, 1);
  assert.equal(summary.kpis.referralContributionPercent, 33.3);
  assert.equal(summary.studentReferrers[0].successfulReferrals, 1);
  assert.equal(summary.campusLeaderboard[0].registrations, 2);
  assert.equal(summary.acquisitionSources.find(source => source.sourceKey === 'email')?.registrations, 1);
  assert.equal(summary.recentRegistrations[0].email, undefined);
});

test('invalid and self referral codes do not increase referral analytics', () => {
  const rows: RegistrationRow[] = [
    { id: '1', full_name: 'A B', college: 'MSRIT', source: 'referrals', campus_code: null, referral_code: 'AI60-AB1234567', referred_by: null, created_at: '2026-10-01T00:00:00Z' },
    { id: '2', full_name: 'C D', college: 'MSRIT', source: 'referrals', campus_code: null, referral_code: 'AI60-CD1234567', referred_by: 'AI60-MISSING', created_at: '2026-10-02T00:00:00Z' },
    { id: '3', full_name: 'E F', college: 'RVCE', source: 'referrals', campus_code: null, referral_code: 'AI60-EF1234567', referred_by: 'AI60-EF1234567', created_at: '2026-10-03T00:00:00Z' },
  ];
  const result = calculateAnalytics(rows);
  assert.equal(result.kpis.referralRegistrations, 0);
  assert.equal(result.studentReferrers.length, 0);
});
