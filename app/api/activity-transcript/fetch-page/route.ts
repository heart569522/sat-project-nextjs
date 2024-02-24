import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 10;
const searchColumns = [
  'date',
  'firstname',
  'lastname',
  'student_id',
  'phone',
  'faculty',
  'major',
  'email',
  'delivery_method',
  'recipient_name',
  'recipient_address',
  'recipient_phone',
  'status_id',
];

export async function GET(req: NextRequest) {
  noStore();

  const search = req.nextUrl.searchParams.get('query');

  try {
    let searchConditions = `activity_transcript_pn11.is_delete = false`;

    if (search) {
      searchConditions += ` AND ${searchColumns
        .map((column) => {
          if (column === 'status_id') {
            return `(CAST(pn11_status.name AS TEXT) ILIKE '%${search}%' OR CAST(activity_transcript_pn11.${column} AS TEXT) ILIKE '%${search}%')`;
          } else {
            return `CAST(activity_transcript_pn11.${column} AS TEXT) ILIKE '%${search}%'`;
          }
        })
        .join(' OR ')}`;
    }

    const sqlQuery = `
      SELECT COUNT(*) 
      FROM activity_transcript_pn11
      LEFT JOIN pn11_status ON activity_transcript_pn11.status_id = pn11_status.id
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
