import { generateReferralCode } from '@/lib/attribution';
import { getSupabaseServer } from '@/lib/supabase-server';
import { isDuplicateEmailError, validateRegistration } from '@/lib/registration-validation';

export async function POST(request: Request) {
  let payload: unknown;
  try { payload = await request.json(); } catch { return Response.json({ success: false, error: 'Invalid request.' }, { status: 400 }); }
  const { data, error } = validateRegistration(payload);
  if (!data) return Response.json({ success: false, error }, { status: 400 });
  try {
    const db = getSupabaseServer();
    const { data: existing, error: lookupError } = await db.from('registrations').select('id').eq('email', data.email).maybeSingle();
    if (lookupError) throw lookupError;
    if (existing) return Response.json({ success: false, error: 'It looks like you’re already registered.' }, { status: 409 });
    if (data.referredByCode) {
      const { data: referrer, error: refError } = await db.from('registrations').select('email,phone').eq('referral_code', data.referredByCode).maybeSingle();
      if (refError) throw refError;
      if (!referrer) return Response.json({ success: false, error: 'Invalid referral code.' }, { status: 400 });
      if (referrer.email === data.email || referrer.phone.replace(/\D/g, '') === data.phoneNumber.replace(/\D/g, ''))
        return Response.json({ success: false, error: 'You cannot refer yourself.' }, { status: 400 });
    }
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = generateReferralCode(data.fullName);
      const { error: insertError } = await db.from('registrations').insert({
        full_name: data.fullName, email: data.email, phone: data.phoneNumber, college: data.college,
        branch: data.branch, graduation_year: data.graduationYear, source: data.acquisitionSource,
        campus_code: data.acquisitionCampus, referral_code: code, referred_by: data.referredByCode,
      });
      if (!insertError) return Response.json({ success: true, referralCode: code }, { status: 201 });
      if (isDuplicateEmailError(insertError)) return Response.json({ success: false, error: 'It looks like you’re already registered.' }, { status: 409 });
      if (insertError.code === '23505' && /referral_code/i.test(insertError.message)) continue;
      if (insertError.code === '23503') return Response.json({ success: false, error: 'Invalid referral code.' }, { status: 400 });
      throw insertError;
    }
    throw new Error('Could not allocate a referral code.');
  } catch (cause) {
    console.error('Registration failed', cause);
    return Response.json({ success: false, error: 'Registration is temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
