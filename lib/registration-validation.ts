import type { RegistrationInput } from './registration-service';

export function validateRegistration(value: unknown): { data?: RegistrationInput; error?: string } {
  if (!value || typeof value !== 'object') return { error: 'Invalid registration.' };
  const raw = value as Record<string, unknown>;
  const text = (key: string) => typeof raw[key] === 'string' ? (raw[key] as string).trim() : '';
  const fullName = text('fullName'), email = text('email').toLowerCase(), phoneNumber = text('phoneNumber');
  const college = text('college'), branch = text('branch');
  const graduationYear = Number(raw.graduationYear);
  if (fullName.length < 2 || fullName.length > 100 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254 ||
      !/^\+?[\d\s()-]{10,20}$/.test(phoneNumber) || phoneNumber.replace(/\D/g, '').length < 10 ||
      college.length < 2 || college.length > 150 || branch.length < 2 || branch.length > 100 ||
      !Number.isInteger(graduationYear) || graduationYear < 2025 || graduationYear > 2032) return { error: 'Please check your registration details.' };
  const referredByCode = text('referredByCode').toUpperCase() || null;
  if (referredByCode && !/^AI60-[A-Z0-9]{9}$/.test(referredByCode)) return { error: 'Invalid referral code.' };
  const source = text('acquisitionSource').toLowerCase();
  const campus = text('acquisitionCampus');
  if (source.length > 80 || campus.length > 100) return { error: 'Invalid attribution details.' };
  return { data: { fullName, email, phoneNumber, college, branch, graduationYear,
    referredByCode, acquisitionSource: source || 'direct', acquisitionCampus: campus || null } };
}

export function isDuplicateEmailError(error: { code?: string; message?: string } | null): boolean {
  return error?.code === '23505' && /email|registrations_email_key/i.test(error.message || '');
}
