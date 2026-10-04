import { calculateAnalytics, type RegistrationRow } from '@/lib/analytics';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET() {
  try {
    const db = getSupabaseServer();
    const rows: RegistrationRow[] = [];
    for (let offset = 0; ; offset += 1000) {
      const { data, error } = await db.from('registrations')
        .select('id,full_name,college,source,campus_code,referral_code,referred_by,created_at')
        .order('created_at', { ascending: true }).range(offset, offset + 999);
      if (error) throw error;
      rows.push(...(data || []));
      if (!data || data.length < 1000) break;
    }
    return Response.json(calculateAnalytics(rows), { headers: { 'Cache-Control': 'no-store' } });
  } catch (cause) {
    console.error('Analytics failed', cause);
    return Response.json({ error: 'Live analytics are unavailable.' }, { status: 503 });
  }
}
