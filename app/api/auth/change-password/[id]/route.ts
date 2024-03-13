import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const client = await pool.connect();
  const { id } = context.params;

  try {
    await client.query('BEGIN');

    const formData = await req.json();
    const { currentPassword, newPassword } = formData;

    const res = await pool.query(`SELECT password FROM users WHERE id = $1`, [
      id,
    ]);

    const passwordsMatch = await bcrypt.compare(
      currentPassword,
      res.rows[0].password,
    );
    if (passwordsMatch) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        newPassword.toString(),
        saltRounds,
      );

      await client.query(
        `
            UPDATE users
            SET password = $1
            WHERE id = $2;
        `,
        [hashedPassword, id],
      );

      await client.query('COMMIT');

      return NextResponse.json(res.rows[0], { status: 200 });
    } else {
      await client.query('ROLLBACK');
      return NextResponse.json(
        {
          message: 'Can not update data!!',
        },
        { status: 500 },
      );
    }
  } catch (error) {
    await client.query('ROLLBACK');

    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      {
        message: 'Can not update data!!',
        error,
      },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
