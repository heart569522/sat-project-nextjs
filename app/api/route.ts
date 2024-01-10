import { pool } from '../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM NOW()');
    if (res) {
      console.log('Connected to the database');

      return new NextResponse('Connect Database Success!', {
        status: 200,
      });
    }
  } catch (error) {
    console.log('Connect Failed!!');
    return new Response(`Connect database error: ${error}`, {
      status: 500,
    });
  }
}
