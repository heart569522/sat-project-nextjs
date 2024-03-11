import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

const searchColumns = [
  'project_code',
  'project_name',
  'students',
  'project_hour',
  'project_year',
  'created_at',
];

export async function GET(req: NextRequest) {
  noStore();
  try {
    const page = req.nextUrl.searchParams.get('page');
    const search = req.nextUrl.searchParams.get('search');
    const userId = req.nextUrl.searchParams.get('userId');
    const isAdminFetch = req.nextUrl.searchParams.get('isWithoutDraft');

    const ITEMS_PER_PAGE = isAdminFetch ? 10 : 5;

    const offset = (Number(page) - 1) * ITEMS_PER_PAGE;

    let searchConditions = `student_attendance_pn10.is_delete = false`;

    if (search) {
      console.log('search');
      searchConditions += ` AND (${searchColumns
        .map((column) => {
          return `CAST(student_attendance_pn10.${column} AS TEXT) ILIKE '%${search}%'`;
        })
        .join(' OR ')})`;

      if (userId) {
        searchConditions += ` AND student_attendance_pn10.created_by = '${userId}'`;
      }
    } else {
      if (userId) {
        searchConditions += ` AND student_attendance_pn10.created_by = '${userId}'`;
      }
    }

    const sqlQuery = `
      SELECT *
      FROM student_attendance_pn10
      WHERE ${searchConditions}
      ORDER BY student_attendance_pn10.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

    const response = await pool.query(sqlQuery);

    return NextResponse.json(response.rows, { status: 200 });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { message: `Server error, please try again later` },
      {
        status: 500,
      },
    );
  }
}
