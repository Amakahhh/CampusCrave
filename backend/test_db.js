import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing connection to:', process.env.DATABASE_URL.split('@')[1]);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
});

async function test() {
  try {
    await client.connect();
    console.log('✅ Connection successful!');
    const res = await client.query('SELECT current_database(), current_user');
    console.log('Database info:', res.rows[0]);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    await client.end();
  }
}

test();
