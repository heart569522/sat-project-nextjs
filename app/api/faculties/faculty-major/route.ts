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
    await client.query('ALTER TABLE users DROP CONSTRAINT users_major_id_fkey');
    await client.query('ALTER TABLE majors DROP CONSTRAINT majors_faculty_id_fkey');

    const formData = await req.json();
    const { facultyData, majorData } = formData;

    const insertFacultyQuery = `
      INSERT INTO faculties (name)
      VALUES ($1)
    `;

    const insertMajorQuery = `
      INSERT INTO majors (name, faculty_id)
      VALUES ($1, $2)
    `;

    const deleteFacultyQuery = `
      DELETE FROM faculties WHERE id = $1
    `;

    const deleteMajorQuery = `
      DELETE FROM majors WHERE id = $1
    `;

    const existingFaculty = await client.query('SELECT * FROM faculties');
    const existingMajor = await client.query('SELECT * FROM majors');

    for (const row of existingFaculty.rows) {
      const { id: existingId } = row;

      const matchingRow = facultyData.find(
        ({ id }: { id: number }) => id === existingId,
      );

      if (!matchingRow) {
        await client.query(deleteFacultyQuery, [existingId]);
      }
    }

    for (const { id, name } of facultyData) {
      const existingRow = await client.query(
        'SELECT * FROM faculties WHERE id = $1',
        [id],
      );
      if (existingRow.rows.length === 0) {
        await client.query(insertFacultyQuery, [ name]);
      } else {
        await client.query('UPDATE faculties SET name = $1 WHERE id = $2', [
          name,
          id,
        ]);
      }
    }

    for (const row of existingMajor.rows) {
      const { id: existingId } = row;

      const matchingRow = majorData.find(
        ({ id }: { id: number }) => id === existingId,
      );

      if (!matchingRow) {
        await client.query(deleteMajorQuery, [existingId]);
      }
    }

    for (const { id, name, faculty_id } of majorData) {
      const existingRow = await client.query(
        'SELECT * FROM majors WHERE id = $1',
        [id],
      );
      if (existingRow.rows.length === 0) {
        await client.query(insertMajorQuery, [name, faculty_id]);
      } else {
        await client.query(
          'UPDATE majors SET name = $1, faculty_id = $2 WHERE id = $3',
          [name, faculty_id, id],
        );
      }
    }

    await client.query('ALTER TABLE users ADD CONSTRAINT users_major_id_fkey FOREIGN KEY (major_id) REFERENCES majors(id)');
    await client.query('ALTER TABLE majors ADD CONSTRAINT majors_faculty_id_fkey FOREIGN KEY (faculty_id) REFERENCES faculties(id)');
    await client.query('COMMIT');

    return NextResponse.json(
      {
        message: 'Update data success',
      },
      { status: 200 },
    );
  } catch (error) {
    await client.query('ROLLBACK');
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
