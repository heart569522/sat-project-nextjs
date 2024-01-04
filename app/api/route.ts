import { pool } from '../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM NOW()');
    if (res) {
      console.log('Connected to the database');
      return NextResponse.json({ message: 'Connect Database Success' });
    }
  } catch (error) {
    console.log('Connect Failed!!');
    return NextResponse.json({ message: 'Connect Failed!!', error });
  }
}
