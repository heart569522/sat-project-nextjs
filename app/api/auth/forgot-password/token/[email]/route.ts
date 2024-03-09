import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  context: { params: { email: string } },
) {
  try {
    const { email } = context.params;

    const formData = await req.json();
    const { token } = formData;

    await pool.query(
      `
        UPDATE users
        SET forgot_password_token = $1, token_expires_at = NOW() + INTERVAL '1 hour'
        WHERE email = $2;
      `,
      [token, email],
    );

    return NextResponse.json(
      {
        message: 'Added token success',
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
