import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search');
  const userId = req.nextUrl.searchParams.get('userId');
  const userRole = req.nextUrl.searchParams.get('userRole');

  try {
    let searchConditions = `status_id = 5`;

    if (userRole === 'admin') {
      searchConditions += ` AND project_code = '${search}'`;
    } else {
      searchConditions += ` AND project_code = '${search}' AND created_by = '${userId}'`;
    }

    const sqlQuery = `SELECT * FROM project_proposal_pn01 WHERE ${searchConditions}`;

    const res = await pool.query(sqlQuery);

    return NextResponse.json(res.rows[0], { status: 200 });
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
