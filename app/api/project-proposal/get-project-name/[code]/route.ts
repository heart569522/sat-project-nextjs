import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { PN01 } from '@/app/model/pn01';

export async function GET(
  req: NextRequest,
  context: { params: { code: string } },
) {
  const { code } = context.params;

  try {
    const res = await pool.query<PN01>(
      `SELECT project_name FROM project_proposal_pn01 WHERE project_code = $1`,
      [code],
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
