import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Faculties } from '@/app/model/faculties-majors';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query<Faculties>(
      `SELECT * FROM faculties WHERE is_delete = false AND id = $1`,
      [id],
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
