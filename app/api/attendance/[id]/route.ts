import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query(
      `SELECT * FROM student_attendance_pn10 WHERE is_delete = false AND id = $1`,
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
  const { id } = context.params;
  const formData = await req.json();

  const { projectCode, projectName, projectYear, projectHour, studentRows } =
    formData;

  const studentList = JSON.stringify(studentRows);

  try {
    const res = await pool.query(
      `
      UPDATE student_attendance_pn10
      SET 
        project_code = $1,
        project_name = $2,
        project_year = $3,
        project_hour = $4,
        students = $5
      WHERE id = $6
      RETURNING *;
      `,
      [projectCode, projectName, projectYear, projectHour, studentList, id],
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

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query(
      `
      UPDATE student_attendance_pn10
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
