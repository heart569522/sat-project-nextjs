import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  const formData = await req.json();
  console.log('🚀 ~ formData:', formData);

  try {
    const res = await pool.query(
      `
        UPDATE student_attendance_pn10
        SET project_hour = $1
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
