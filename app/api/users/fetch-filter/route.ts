import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 10;
const searchColumns = [
  'firstname',
  'lastname',
  'phone',
  'faculty_name',
  'major_name',
  'email',
  'username',
  'is_verify',
  'role',
];

export async function GET(req: NextRequest) {
  noStore();
  try {
    const page = req.nextUrl.searchParams.get('page');
    const search = req.nextUrl.searchParams.get('search');

    const offset = (Number(page) - 1) * ITEMS_PER_PAGE;

    let searchConditions = `users.is_delete = false`;

    if (search) {
      searchConditions += ` AND ${searchColumns
        .map((column) => {
          return `CAST(users.${column} AS TEXT) ILIKE '%${search}%'`;
        })
        .join(' OR ')}`;
    }

    const sqlQuery = `
      SELECT users.*
      FROM users
      WHERE ${searchConditions}
      ORDER BY users.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    // console.log("🚀 ~ GET ~ sqlQuery:", sqlQuery)

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
