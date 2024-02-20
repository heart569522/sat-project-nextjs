import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/app/model/user';

export async function GET(
  req: NextRequest,
  context: { params: { data: string } },
) {
  const { data } = context.params;
  console.log('🚀 ~ data:', data);

  try {
    const res = await pool.query<Users>(
      `SELECT role FROM users WHERE is_delete = false AND email = $1`,
      [data],
    );

    return NextResponse.json(res.rows[0].role, { status: 200 });
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      {
        message: 'Can not get data!!',
        error,
      },
      { status: 500 },
    );
  }
}
