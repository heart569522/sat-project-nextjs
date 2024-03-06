import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    await pool.query(
      `
        UPDATE project_proposal_pn01
        SET is_create_attendance = true
        WHERE id = $1;
        `,
      [id],
    );

    return NextResponse.json(
      { meesage: 'Update attendance success' },
      { status: 200 },
    );
  } catch (error) {
    console.log("🚀 ~ error:", error)
    return NextResponse.json(
      {
        message: 'Can not update data!!',
        error,
      },
      { status: 500 },
    );
  }
}
