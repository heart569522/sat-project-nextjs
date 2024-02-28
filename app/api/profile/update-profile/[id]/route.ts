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
          UPDATE activity_transcript_pn11
          SET
            firstname = $1,
            lastname = $2,
            student_id = $3,
            phone = $4,
            faculty_name = (SELECT name FROM faculties WHERE id = $5),
            faculty_id = $5,
            major_name = (SELECT name FROM majors WHERE id = $6),
            major_id = $6,
            email = $7,
            delivery_method = $8,
            recipient_name = $9,
            recipient_address = $10,
            recipient_phone = $11
          WHERE
            id = $12
        `,
        [
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
          id
        ]
      );
  
      return NextResponse.json(
        {
          message: 'Update activity transcript success',
        },
        { status: 200 },
      );
    } catch (error) {
      console.log("🚀 ~ error:", error)
      return NextResponse.json(
        { message: `Server error, please try again later` },
        { status: 500 },
      );
    }
  }
