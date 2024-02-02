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
  'target_total',
  'budget_expense_total',
  'budget_income_total',
  'status_id',
];

export async function GET(req: NextRequest) {
  noStore();
  try {
    const page = req.nextUrl.searchParams.get('page');
    const search = req.nextUrl.searchParams.get('search');

    const offset = (Number(page) - 1) * ITEMS_PER_PAGE;

    let searchConditions = '';
    if (search) {
      searchConditions = `WHERE ${searchColumns
        .map((column) => {
          if (column === 'status_id') {
            return `(CAST(pn01_status.name AS TEXT) ILIKE '%${search}%' OR CAST(project_proposal_pn01.${column} AS TEXT) ILIKE '%${search}%')`;
          } else {
            return `CAST(project_proposal_pn01.${column} AS TEXT) ILIKE '%${search}%'`;
          }
        })
        .join(' OR ')} AND project_proposal_pn01.is_delete = false`;
    } else {
      searchConditions = 'WHERE project_proposal_pn01.is_delete = false';
    }

    const projects = await pool.query(
      `SELECT project_proposal_pn01.*, pn01_status.name AS status_name
           FROM project_proposal_pn01
           LEFT JOIN pn01_status ON project_proposal_pn01.status_id = pn01_status.id
           ${searchConditions}
           ORDER BY project_proposal_pn01.created_at DESC
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
