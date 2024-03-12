import { pool } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await pool.query(
      `SELECT COUNT(*) FROM activity_transcript_pn11 WHERE is_delete = false AND is_verify = true`,
    );

    return NextResponse.json(res.rows[0].count);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Can not get data!!',
        error,
      },
      { status: 500 },
    );
  }
}
