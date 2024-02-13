import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { data: string } },
) {
  const { data } = context.params;

  try {
    const res = await pool.query(
      `SELECT username FROM users WHERE is_delete = false AND username = $1`,
      [data],
    );

    if (res.rows.length > 0) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking username existence:", error);
    return NextResponse.json(
      {
        message: 'Error checking username existence',
        error,
      },
      { status: 500 },
    );
  }
}
