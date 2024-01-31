import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { PN11 } from '@/app/model/pn11';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query<PN11>(
      `SELECT * FROM activity_transcript_pn11 WHERE is_delete = false AND id = $1 ORDER BY id`,
      [id],
    );

    return NextResponse.json(res.rows[0], { status: 200 });
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
