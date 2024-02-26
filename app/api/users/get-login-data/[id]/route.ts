import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/app/model/user';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query<Users>(
      `SELECT * FROM users WHERE is_delete = false AND id = $1`,
      [id],
    );

    return NextResponse.json(res.rows[0], { status: 200 });
  } catch (error) {
    console.log("🚀 ~ error:", error)
    return NextResponse.json(
      {
        message: 'Can not get data!!',
        error,
      },
      { status: 500 },
    );
  }
}
