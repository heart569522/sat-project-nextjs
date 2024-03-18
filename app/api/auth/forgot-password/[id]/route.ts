import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const { id } = context.params;
    const password = await req.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);

    const response = await pool.query(
      `
        UPDATE users
        SET 
          password = $1,
          forgot_password_token = null,
          token_expires_at = null
        WHERE id = $2
        RETURNING *
      `,
      [hashedPassword, id],
    );

    return NextResponse.json(
      {
        message: 'Update password success',
        id: response.rows[0].id,
        data: response.rows[0],
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
