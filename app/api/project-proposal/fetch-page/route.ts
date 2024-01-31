import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 10;
const searchColumns = [
  'project_code',
  'date',
  'time',
  'faculty',
  'project_name',
  'project_head',
  'project_head_phone',
  'project_responsible',
  'project_type',
  'university_identity',
  'principle_reason',
  'objective_indicator_value_tool',
  'expected_result',
  'operation_duration',
  'project_location',
  'project_datetime',
  'project_schedule',
  'lecturer',
  'target',
  'improvement',
  'budget_income',
  'budget_expense',
  'status_id',
  'target_total',
  'budget_expense_total',
  'budget_income_total',
];

export async function GET(query: NextRequest) {
  noStore();
  try {
    const searchConditions = query
      ? `WHERE ${searchColumns
          .map((column) => `CAST(${column} AS TEXT) ILIKE '%${query}%'`)
          .join(' OR ')}`
      : '';

    const count = await pool.query(
      `SELECT COUNT(*) FROM project_proposal_pn01 ${searchConditions} AND is_delete = false`,
    );
    console.log("🚀 ~ GET ~ count:", count)

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return NextResponse.json(totalPages, { status: 200 });
  } catch (error) {
    // console.error('Server error:', error);
    return NextResponse.json(
      { message: `Server error, please try again later` },
      {
        status: 500,
      },
    );
  }
}
