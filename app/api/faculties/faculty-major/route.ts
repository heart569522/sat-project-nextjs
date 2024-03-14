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
  try {
    const formData = await req.json();
    const { facultyData, majorData } = formData;

    const insertFacultyQuery = `
      INSERT INTO faculties (id, name)
      VALUES ($1, $2)
    `;

    const insertMajorQuery = `
      INSERT INTO majors (id, name, faculty_id)
      VALUES ($1, $2, $3)
    `;

    const deleteFacultyQuery = `
      DELETE FROM faculties WHERE id = $1
    `;

    const deleteMajorQuery = `
      DELETE FROM majors WHERE id = $1
    `;

    for (const faculty of facultyData) {
      const existingFaculty = await pool.query(
        'SELECT * FROM faculties WHERE id = $1',
        [faculty.id],
      );

      if (existingFaculty.rows.length === 0) {
        await pool.query(insertFacultyQuery, [faculty.id, faculty.name]);
      }
    }

    for (const major of majorData) {
      const existingMajor = await pool.query(
        'SELECT * FROM majors WHERE id = $1',
        [major.id],
      );

      if (existingMajor.rows.length === 0) {
        await pool.query(insertMajorQuery, [
          major.id,
          major.name,
          major.faculty_id,
        ]);
      }
    }

    // Delete faculties not in the new data
    const existingFacultyIds = facultyData.map((faculty: { id: any; }) => faculty.id);
    const allExistingFacultyIds = await pool.query('SELECT id FROM faculties');
    const facultyIdsToDelete = allExistingFacultyIds.rows
      .map((faculty) => faculty.id)
      .filter((id) => !existingFacultyIds.includes(id));

    for (const id of facultyIdsToDelete) {
      await pool.query(deleteFacultyQuery, [id]);
    }

    // Delete majors not in the new data
    const existingMajorIds = majorData.map((major: { id: any; }) => major.id);
    const allExistingMajorIds = await pool.query('SELECT id FROM majors');
    const majorIdsToDelete = allExistingMajorIds.rows
      .map((major) => major.id)
      .filter((id) => !existingMajorIds.includes(id));

    for (const id of majorIdsToDelete) {
      await pool.query(deleteMajorQuery, [id]);
    }

    return NextResponse.json(
      {
        message: 'Update data success',
      },
      { status: 200 },
    );
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json(
      {
        message: 'Can not update data!!',
        error,
      },
      { status: 500 },
    );
  }
}
