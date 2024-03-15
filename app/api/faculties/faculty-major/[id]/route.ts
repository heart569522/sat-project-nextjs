import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  noStore();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { id } = context.params;
    const formData = await req.json();
    const { facultyName, majorData } = formData;

    // Update faculty name in the faculties table
    await client.query('UPDATE faculties SET name = $1 WHERE id = $2', [
      facultyName,
      id,
    ]);

    // Get existing majors associated with the faculty
    const existingMajors = await client.query(
      'SELECT id FROM majors WHERE faculty_id = $1',
      [id],
    );

    const existingMajorIds = existingMajors.rows.map((row) => row.id);

    // Process majors data
    for (const major of majorData) {
      // Check if major exists in the majors table
      if (existingMajorIds.includes(major.id)) {
        // If major exists, update it
        await client.query(
          `UPDATE majors SET name = $1, faculty_id = $2 WHERE id = $3`,
          [major.name, major.faculty_id, major.id],
        );

        // Remove the major id from the existingMajorIds array
        const index = existingMajorIds.indexOf(major.id);
        existingMajorIds.splice(index, 1);
      } else {
        // If major doesn't exist, insert it
        await client.query(
          `INSERT INTO majors (name, faculty_id)
             VALUES ($1, $2)`,
          [major.name, major.faculty_id],
        );
      }
    }

    // Soft Delete majors that are not in the majorData array
    for (const majorIdToDelete of existingMajorIds) {
      // Soft delete the major
      await client.query('UPDATE majors SET is_delete = true WHERE id = $1', [
        majorIdToDelete,
      ]);
    }

    await client.query('COMMIT');

    return NextResponse.json(
      { message: 'Update data success' },
      { status: 200 },
    );
  } catch (error) {
    console.log('🚀 ~ error:', error);
    await client.query('ROLLBACK');
    return NextResponse.json(
      {
        message: 'Can not update data!!',
        error,
      },
      { status: 500 },
    );
  }
}
