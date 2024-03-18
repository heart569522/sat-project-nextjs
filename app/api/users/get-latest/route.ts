import { pool } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await pool.query(`
        SELECT id, firstname, lastname, phone, created_at FROM users 
        WHERE is_delete = false
        AND is_verify = false
        ORDER BY created_at DESC
        LIMIT 5;
    `);

    return NextResponse.json(res.rows, { status: 200 });
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
    return NextResponse.json(
      { message: `Server error please try again later` },
      {
        status: 500,
      },
    );
  }
}
