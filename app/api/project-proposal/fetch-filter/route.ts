import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 10;
const searchColumns = [
  'project_code',
  'date',
  'project_name',
  'project_head',
  'status',
];

export async function GET(req: NextRequest) {
  noStore();
  try {
    const page = req.nextUrl.searchParams.get('page');
    const search = req.nextUrl.searchParams.get('search');

    const offset = (Number(page) - 1) * ITEMS_PER_PAGE;

    const searchConditions = search
      ? `WHERE ${searchColumns
          .map((column) => `CAST(${column} AS TEXT) ILIKE '%${search}%'`)
          .join(' OR ')} AND is_delete = false`
      : 'WHERE is_delete = false';

    const projects = await pool.query(
      `SELECT *
           FROM project_proposal_pn01
           ${searchConditions}
           ORDER BY created_at DESC
           LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`,
    );

    return NextResponse.json(projects.rows, { status: 200 });
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
