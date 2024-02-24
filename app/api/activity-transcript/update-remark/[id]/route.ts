import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const formData = await req.json();
  const { id } = context.params;

  try {
    const res = await pool.query(
      `
        UPDATE activity_transcript_pn11
        SET status_remark = $1
        WHERE id = $2
        RETURNING *;
        `,
      [formData, id],
    );

    return NextResponse.json(res.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Can not update data!!',
        error,
      },
      { status: 500 },
    );
  }
}
