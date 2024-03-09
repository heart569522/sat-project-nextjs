import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { token: string } },
) {
  try {
    const { token } = context.params;
    console.log('🚀 ~ token:', token);

    const res = await pool.query(
      `
        SELECT *, NOW()
        FROM users
        WHERE forgot_password_token = $1
      `,
      [token],
    );

    const expireTime = res.rows[0].token_expires_at;
    const currentTime = res.rows[0].now;

    if (currentTime < expireTime) {
      return NextResponse.json(
        {
          message: 'Check expire token success',
          id: res.rows[0].id,
          token_valid: true,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: `Token is expire`,
          token_valid: false,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { message: `Server error, please try again later`, token_valid: false },
      { status: 500 },
    );
  }
}
