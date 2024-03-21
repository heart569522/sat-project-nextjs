import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
  try {
    const res = await pool.query(
      `SELECT * FROM faculties WHERE is_delete = false ORDER BY id`,
    );

    return NextResponse.json(res.rows, { status: 200 });
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
