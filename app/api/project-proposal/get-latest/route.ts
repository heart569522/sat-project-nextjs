import { pool } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await pool.query(`
        SELECT id, project_name, project_code, date, time, created_at FROM project_proposal_pn01 
        WHERE is_delete = false 
          AND is_draft = false
          AND status_id <> 5
          AND status_id <> 0
        ORDER BY created_at DESC
        LIMIT 5;
    `);

    return NextResponse.json(res.rows, { status: 200 });
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
    return NextResponse.json(
      { message: `Server error please try again later` },
      {
        status: 500,
      },
    );
  }
}
