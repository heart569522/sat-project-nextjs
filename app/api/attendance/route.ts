import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const formData = await req.json();
    const { projectCode, students, projectYear, userId, pn01Id } = formData;

    const studentList = JSON.stringify(students);

    // Insert into student_attendance_pn10
    const response = await client.query(
      `
        INSERT INTO student_attendance_pn10 (
          project_code, students, project_year, created_by
        )
        VALUES (
          $1, $2, $3,
          (SELECT id FROM users WHERE id = $4)
        )
        RETURNING *;
      `,
      [projectCode, studentList, projectYear, userId],
    );

    // Update project_proposal_pn01
    await client.query(
      `
        UPDATE project_proposal_pn01
        SET is_create_attendance = true
        WHERE id = $1;
      `,
      [pn01Id],
    );

    await client.query('COMMIT');

    return NextResponse.json(
      {
        message: 'Create attendance success',
        id: response.rows[0].id,
        data: response.rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json(
      { message: `Server error, please try again later` },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
