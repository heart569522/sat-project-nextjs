import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { PN01 } from '@/app/model/pn01';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query<PN01>(
      `SELECT * FROM users WHERE is_delete = false AND id = $1`,
      [id],
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

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const formData = await req.json();
    const { id } = context.params;

    const {
      firstname,
      lastname,
      email,
      phone,
      faculty_id,
      major_id,
      username,
      role,
      is_verify,
    } = formData;

    const response = await pool.query(
      `
          UPDATE users
          SET
            firstname = $1,
            lastname = $2,
            email = $3,
            phone = $4,
            faculty_name = (SELECT name FROM faculties WHERE id = $5),
            faculty_id = $5,
            major_name = (SELECT name FROM majors WHERE id = $6),
            major_id = $6,
            username = $7,
            role = $8,
            is_verify = $9
          WHERE
            id = $10
        `,
      [
        firstname,
        lastname,
        email,
        phone,
        faculty_id,
        major_id,
        username,
        role,
        is_verify,
        id,
      ],
    );

    return NextResponse.json(
      {
        message: 'Update profile success',
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

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query(
      `
      UPDATE users
      SET is_delete = true
      WHERE id = $1
      RETURNING *;
      `,
      [id],
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

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *;
      `,
      [id],
    );

    return NextResponse.json(res.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Can not delete data!!',
        error,
      },
      { status: 500 },
    );
  }
}
