import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/app/model/user';

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } },
) {
  const { userId } = context.params;

  try {
    const res = await pool.query<Users>(
      `SELECT * FROM users WHERE is_delete = false AND id = $1 ORDER BY id`,
      [userId],
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
