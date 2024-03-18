import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

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
            username = $7
          WHERE
            id = $8
        `,
      [firstname, lastname, email, phone, faculty_id, major_id, username, id],
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
