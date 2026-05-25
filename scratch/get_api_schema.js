async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/';
  const headers = {
    'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
  };
  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    console.log('Path /rpc/rls_auto_enable:', JSON.stringify(data.paths['/rpc/rls_auto_enable'], null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
