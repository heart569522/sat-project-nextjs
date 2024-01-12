import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
// import { unstable_noStore as noStore } from 'next/cache';
import { strategic_plan_kpi_list } from '@/app/model/pn01-select-list';

export async function GET() {
  //   noStore();

  try {
    const res = await pool.query<strategic_plan_kpi_list>(
      `SELECT * FROM strategic_plan_kpi_list ORDER BY id`,
    );
    return NextResponse.json(res.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Can not get data!!',
        error,
      },
      { status: 500 },
    );
  }
}
