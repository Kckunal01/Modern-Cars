import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mvtmlsfarspfbmpjnxdf.supabase.co';
// WARNING: The service role key should ONLY be used in server-side API routes.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_mN8zxdWDkBzO3N7LxUBfEw_vGb8u6RR';

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
