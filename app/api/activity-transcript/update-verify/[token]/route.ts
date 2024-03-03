import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  context: { params: { token: string } },
) {
  try {
    const { token } = context.params;

    const response = await pool.query(
      `
        UPDATE public.activity_transcript_pn11
        SET is_verify = true
        WHERE verify_token = $1
        RETURNING *
      `,
      [token],
    );

    return NextResponse.json(
      {
        message: 'Update verify success',
        id: response.rows[0].id,
        data: response.rows[0]
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error, please try again later` },
      { status: 500 },
    );
  }
}
