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

  const search = req.nextUrl.searchParams.get('query');
  const userId = req.nextUrl.searchParams.get('userId');
  const isWithoutDraft = req.nextUrl.searchParams.get('isWithoutDraft');

  try {
    let searchConditions = '';

    if (search) {
      searchConditions = `${searchColumns
        .map((column) => {
          if (column === 'status_id') {
            return `(CAST(pn01_status.name AS TEXT) ILIKE '%${search}%' OR CAST(project_proposal_pn01.${column} AS TEXT) ILIKE '%${search}%')`;
          } else {
            return `CAST(project_proposal_pn01.${column} AS TEXT) ILIKE '%${search}%'`;
          }
        })
        .join(' OR ')}`;
    
      if (userId) {
        searchConditions += ` AND project_proposal_pn01.is_delete = false AND project_proposal_pn01.created_by = '${userId}'`;
      } else {
        searchConditions += ` AND project_proposal_pn01.is_delete = false`;
      }

      if (isWithoutDraft) {
        searchConditions += ` AND project_proposal_pn01.is_delete = false AND project_proposal_pn01.is_draft = false`;
      } else {
        searchConditions += ` AND project_proposal_pn01.is_delete = false`;
      }
    } else {
      if (userId) {
        searchConditions = `project_proposal_pn01.is_delete = false AND project_proposal_pn01.created_by = '${userId}'`;
      } else {
        searchConditions = 'project_proposal_pn01.is_delete = false';
      }

      if (isWithoutDraft) {
        searchConditions = `project_proposal_pn01.is_delete = false AND project_proposal_pn01.is_draft = false`;
      } else {
        searchConditions = 'project_proposal_pn01.is_delete = false';
      }
    }
    
    const sqlQuery = `
      SELECT COUNT(*) 
      FROM project_proposal_pn01
      LEFT JOIN pn01_status ON project_proposal_pn01.status_id = pn01_status.id
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
