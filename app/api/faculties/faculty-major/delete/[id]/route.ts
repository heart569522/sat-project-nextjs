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
    console.log('🚀 ~ id:', id);

    await client.query('UPDATE faculties SET is_delete = true WHERE id = $1', [
      id,
    ]);

    const findMajor = await client.query(
      'SELECT id FROM majors WHERE faculty_id = $1',
      [id],
    );

    for (const majorRow of findMajor.rows) {
      const majorId = majorRow.id;
      await client.query('UPDATE majors SET is_delete = true WHERE id = $1', [
        majorId,
      ]);
    }

    await client.query('COMMIT');

    return NextResponse.json(
      { message: 'Delete data success' },
      { status: 200 },
    );
  } catch (error) {
    console.log('🚀 ~ error:', error);
    await client.query('ROLLBACK');
    return NextResponse.json(
      {
        message: 'Can not delete data!!',
        error,
      },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
