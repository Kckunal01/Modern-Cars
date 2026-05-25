import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    env[key] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('SUPABASE URL:', supabaseUrl);
console.log('SUPABASE SERVICE KEY EXISTS:', !!supabaseServiceKey);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function test() {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .limit(1);

  if (error) {
    console.error('QUERY ERROR:', error);
  } else {
    console.log('QUERY SUCCESS!');
    if (data && data.length > 0) {
      console.log('Columns on customers:', Object.keys(data[0]));
    } else {
      console.log('No rows in customers, let us insert a dummy or fetch table info.');
    }
  }
}

test();
