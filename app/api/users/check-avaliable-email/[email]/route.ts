import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { email: string } },
) {
  const { email } = context.params;

  try {
    const res = await pool.query(
      `SELECT email FROM users WHERE is_delete = false AND email = $1`,
      [email],
    );

    if (res.rows.length > 0) {
      return NextResponse.json({ avaliable: true }, { status: 200 });
    } else {
      return NextResponse.json({ avaliable: false }, { status: 200 });
    }
  } catch (error) {
    console.error('Error checking email avaliable:', error);
    return NextResponse.json(
      {
        message: 'Error checking email avaliable',
        error,
      },
      { status: 500 },
    );
  }
}
