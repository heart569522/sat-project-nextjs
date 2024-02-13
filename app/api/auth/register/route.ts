import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Role } from '@/app/model/role';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const {
      firstname,
      lastname,
      email,
      phone,
      username,
      password,
      faculty_id,
      major_id,
    } = formData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const response = await pool.query(
      `
        INSERT INTO users (
            firstname, 
            lastname, 
            email, 
            phone, 
            username, 
            password, 
            faculty_id, 
            major_id, 
            faculty_name, 
            major_name,
            role
        )
        VALUES (
            '${firstname}', 
            '${lastname}', 
            '${email}', 
            '${phone}', 
            '${username}', 
            '${hashedPassword}', 
            '${faculty_id}', 
            '${major_id}', 
            (SELECT name FROM faculties WHERE id = ${faculty_id}), 
            (SELECT name FROM majors WHERE id = ${major_id}),
            'teacher'
        );
        `,
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: 'Can not register',
        error,
      },
      { status: 500 },
    );
  }
}
