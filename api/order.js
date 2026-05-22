import Database from 'better-sqlite3';
import path from 'path';

// Note: SQLite on Vercel Serverless Functions is ephemeral. 
// Data will be wiped on cold starts/new deployments.
// A permanent database like Turso, Supabase, or Vercel Postgres is recommended for production.

const dbPath = path.join(process.cwd(), 'orders.db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const db = new Database(dbPath);

    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        address TEXT,
        pincode TEXT,
        city TEXT,
        state TEXT,
        addDoorstep INTEGER,
        doorstepDate TEXT,
        doorstepTime TEXT,
        identity TEXT,
        brand TEXT,
        model TEXT,
        year TEXT,
        baseFare INTEGER,
        discount INTEGER,
        total INTEGER,
        paymentMethod TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const stmt = db.prepare(`
      INSERT INTO orders (
        name, phone, address, pincode, city, state, addDoorstep,
        doorstepDate, doorstepTime, identity, brand, model, year,
        baseFare, discount, total, paymentMethod
      ) VALUES (
        @name, @phone, @address, @pincode, @city, @state, @addDoorstep,
        @doorstepDate, @doorstepTime, @identity, @brand, @model, @year,
        @baseFare, @discount, @total, @paymentMethod
      )
    `);

    const info = stmt.run({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      pincode: req.body.pincode,
      city: req.body.city,
      state: req.body.state,
      addDoorstep: req.body.addDoorstep ? 1 : 0,
      doorstepDate: req.body.doorstepDate,
      doorstepTime: req.body.doorstepTime,
      identity: req.body.identity,
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      baseFare: req.body.baseFare,
      discount: req.body.discount,
      total: req.body.total,
      paymentMethod: req.body.paymentMethod
    });

    // Zapier Webhook
    const zapierUrl = 'https://hooks.zapier.com/hooks/catch/12345/abcdef/'; // Replace with actual Webhook
    try {
      await fetch(zapierUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...req.body, orderId: info.lastInsertRowid })
      });
    } catch (err) {
      console.error('Zapier Webhook Failed:', err);
    }

    res.status(200).json({ success: true, orderId: info.lastInsertRowid });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
