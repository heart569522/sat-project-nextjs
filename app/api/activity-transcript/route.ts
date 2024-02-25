import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentDateAndTime } from '@/app/lib/services';
import { PN11Status } from '@/app/model/pn11-status';

export async function GET() {
  try {
    const res = await pool.query(
      `SELECT * FROM activity_transcript_pn11 WHERE is_delete = false ORDER BY id`,
    );

    const data = res.rows;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server error please try again later` },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const datetime = getCurrentDateAndTime();
    const date = datetime.date;

    const {
      firstname,
      lastname,
      studentId,
      phone,
      faculty,
      major,
      email,
      deliveryMethod,
      recipientName,
      recipientAddress,
      recipientPhone,
    } = formData;

    const response = await pool.query(
      `
        INSERT INTO activity_transcript_pn11 (
          date, firstname, lastname, student_id, phone, faculty_name, faculty_id, major_name, major_id, 
          email, delivery_method, recipient_name, recipient_address, recipient_phone,
          status_id
        )
        VALUES (
          $1, $2, $3, $4, $5,
          (SELECT name FROM faculties WHERE id = $6), $6,
          (SELECT name FROM majors WHERE id = $7), $7,
          $8, $9, $10,
          $11, $12, 
          (SELECT id FROM pn11_status WHERE name = $13)
        )
        RETURNING *;
      `,
      [
        date,
        firstname,
        lastname,
        studentId,
        phone,
        faculty,
        major,
        email,
        deliveryMethod,
        recipientName,
        recipientAddress,
        recipientPhone,
        PN11Status[1],
      ],
    );

    return NextResponse.json(
      {
        message: 'Create request activity transcript success',
        id: response.rows[0].id,
        data: response.rows[0]
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating request activity transcript:', error);
    return NextResponse.json(
      { message: `Server error, please try again later` },
      { status: 500 },
    );
  }
}
