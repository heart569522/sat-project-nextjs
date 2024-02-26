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

  const search = req.nextUrl.searchParams.get('query');

  try {
    let searchConditions = `users.is_delete = false`;

    if (search) {
      searchConditions += ` AND ${searchColumns
        .map((column) => {
          return `CAST(users.${column} AS TEXT) ILIKE '%${search}%'`;
        })
        .join(' OR ')}`;
    }

    const sqlQuery = `
      SELECT COUNT(*) 
      FROM users
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
