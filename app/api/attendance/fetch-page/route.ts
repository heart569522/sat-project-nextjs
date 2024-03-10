import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 5;
const searchColumns = [
  'project_code',
  'project_name',
  'students',
  'project_hour',
  'project_year',
  'created_at'
];

export async function GET(req: NextRequest) {
  noStore();

  const search = req.nextUrl.searchParams.get('query');

  try {
    let searchConditions = `student_attendance_pn10.is_delete = false`;

    if (search) {
      searchConditions += ` AND ${searchColumns
        .map((column) => {
          return `CAST(student_attendance_pn10.${column} AS TEXT) ILIKE '%${search}%'`;
        })
        .join(' OR ')}`;
    }

    const sqlQuery = `
      SELECT COUNT(*) 
      FROM student_attendance_pn10
      WHERE ${searchConditions}`;

    const count = await pool.query(sqlQuery);

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return NextResponse.json(totalPages, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: `Server error, please try again later` },
      {
        status: 500,
      },
    );
  }
}
