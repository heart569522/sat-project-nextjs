import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const { id } = context.params;

    const formData = await req.json();
    const { token } = formData;

    await pool.query(
      `
        UPDATE public.activity_transcript_pn11
        SET verify_token = $1
        WHERE id = $2
      `,
      [token, id],
    );

    return NextResponse.json(
      {
        message: 'Added verify token success',
      },
      { status: 200 },
    );
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { message: `Server error, please try again later` },
      { status: 500 },
    );
  }
}
