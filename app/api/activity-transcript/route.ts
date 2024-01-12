import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentDateAndTime } from '@/app/lib/services';

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

    const response = await pool.query(`
      INSERT INTO activity_transcript_pn11 (
        date, firstname, lastname, student_id, phone, faculty, major, email,
        delivery_method, recipient_name, recipient_address, recipient_phone,
        status
      )
      VALUES (
        '${date}', '${firstname}', '${lastname}', '${studentId}', '${phone}',
        '${faculty}', '${major}', '${email}', '${deliveryMethod}', '${recipientName}',
        '${recipientAddress}', '${recipientPhone}', 'ตรวจสอบข้อมูล'
      )
      RETURNING id;
    `);

    console.log(response);
    

    return NextResponse.json(
      { message: 'Create request activity transcript success', id: response.rows[0].id },
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
