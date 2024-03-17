import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  try {
    const res = await pool.query(
      ` SELECT m.id AS major_id, m.name AS major_name, f.id AS faculty_id, f.name AS faculty_name
        FROM public.majors m
        JOIN public.faculties f ON m.faculty_id = f.id;
    `,
    );

    return NextResponse.json(res.rows, { status: 200 });
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
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
  noStore();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const formData = await req.json();
    const { facultyName, majorData } = formData;

    const facultyResponse = await client.query(
      'INSERT INTO faculties (name) VALUES ($1) RETURNING id',
      [facultyName],
    );

    const faculty_id = facultyResponse.rows[0].id;

    for (const major of majorData) {
      await client.query(
        `INSERT INTO majors (name, faculty_id)
           VALUES ($1, $2)`,
        [major.name, faculty_id],
      );
    }

    await client.query('COMMIT');

    return NextResponse.json(
      {
        message: 'Create data success',
      },
      { status: 201 },
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json(
      {
        message: 'Can not create data!!',
        error,
      },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
