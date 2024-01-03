import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
// import { unstable_noStore as noStore } from 'next/cache';
import { strategic_plan_kpi_list } from '@/app/model/pn01-select-list';

export async function GET() {
  //   noStore();

  try {
    const res =
      await sql<strategic_plan_kpi_list>`SELECT * FROM strategic_plan_kpi_list ORDER BY id`;
    return NextResponse.json(res.rows);
  } catch (error) {
    return NextResponse.json({
      message: 'Can not get data!!',
      error,
    });
  }
}
