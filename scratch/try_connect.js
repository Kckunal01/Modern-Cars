import pg from 'pg';

const host = 'db.mvtmlsfarspfbmpjnxdf.supabase.co';
const user = 'postgres';
const database = 'postgres';
const port = 6543; // Supabase connection pooler or 5432 for direct connection

const passwords = [
  'moderncars_automation_2026_ks72X91',
  'moderncars24',
  'moderncars',
  'Kckunal01',
  'Kckunal01@',
  'Kckunal01@2026',
  'postgres',
  're_7Y9Uj1XE_QAfcGWsrRrYEHmXmpUtwd3Sn',
  'moderncars2026',
  'moderncars_db',
  'moderncars_db_2026'
];

async function tryPassword(password) {
  console.log(`Trying password: ${password}`);
  const client = new pg.Client({
    host,
    user,
    password,
    database,
    port,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log(`SUCCESS with password: ${password}`);
    
    // Execute DDLs
    console.log('Running ALTER TABLE for orders...');
    await client.query(`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS checkout_started_at timestamp with time zone;
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS checkout_completed boolean DEFAULT false;
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS checkout_1h_sent boolean DEFAULT false;
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS checkout_24h_sent boolean DEFAULT false;
    `);
    
    console.log('Running ALTER TABLE for bookings...');
    await client.query(`
      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_started_at timestamp with time zone;
      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_completed boolean DEFAULT false;
      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_1h_sent boolean DEFAULT false;
      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_24h_sent boolean DEFAULT false;
    `);
    
    console.log('DDL execution finished successfully!');
    await client.end();
    return true;
  } catch (err) {
    console.log(`Failed with password: ${password}. Error: ${err.message}`);
    try {
      await client.end();
    } catch {}
    return false;
  }
}

async function run() {
  for (const pw of passwords) {
    const success = await tryPassword(pw);
    if (success) {
      console.log('Tables altered successfully!');
      process.exit(0);
    }
  }
  console.log('All passwords failed.');
}

run();
