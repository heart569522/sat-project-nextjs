import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/app/model/user';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const res = await pool.query<Users>(
      `SELECT * FROM users WHERE is_delete = false ORDER BY id`,
    );

    return NextResponse.json(res.rows, { status: 200 });
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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const {
      firstname,
      lastname,
      email,
      phone,
      faculty_id,
      major_id,
      username,
      password,
      role,
      is_verify,
    } = formData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);

    const response = await pool.query(
      `
          INSERT INTO users (
            firstname, lastname, email, phone, faculty_name, faculty_id, 
            major_name, major_id, username, password, role, is_verify
          )
          VALUES (
            $1, -- firstname
            $2, -- lastname
            $3, -- email
            $4, -- phone
            (SELECT name FROM faculties WHERE id = $5), -- faculty_name
            $5, -- faculty_id
            (SELECT name FROM majors WHERE id = $6), -- major_name
            $6, -- major_id
            $7, -- username
            $8, -- password
            $9, -- role
            $10 -- is_verify
          );
        `,
      [
        firstname,
        lastname,
        email,
        phone,
        faculty_id,
        major_id,
        username,
        hashedPassword,
        role,
        is_verify,
      ],
    );

    return NextResponse.json(
      {
        message: 'Create profile success',
      },
      { status: 201 },
    );
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { message: `Server error, please try again later` },
      { status: 500 },
    );
  }
}
