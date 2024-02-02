import { pool } from '@/app/lib/db';
import { PN01Status } from '@/app/model/pn01-status';
import { NextRequest, NextResponse } from 'next/server';

const columnsInsert = [
  'faculty',
  'project_name',
  'project_head',
  'project_head_phone',
  'project_responsible',
  'strategic_issue_id',
  'objective_id',
  'university_strategic_id',
  'strategic_plan_kpi_id',
  'operational_plan_kpi_id',
  'project_kpi_id',
  'project_status_id',
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
  'target_total',
  'target',
  'improvement',
  'budget_income_total',
  'budget_income',
  'budget_expense_total',
  'budget_expense',
  'is_draft',
  'status_id',
  'created_by',
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const is_draft = formData.isDraft;
    const userId = formData.userId;
    const faculty = formData.faculty;
    const project_name = formData.projectName;
    const project_head = formData.projectHead;
    const project_head_phone = formData.projectHeadPhone;
    const principle_reason = formData.principleReason;
    const project_location = formData.projectLocation;
    const project_datetime = formData.projectDatetime;
    const lecturer = formData.lecturer;
    const improvement = formData.improvement;
    const strategic_issue = formData.strategicIssue;
    const objective = formData.objective;
    const university_strategic = formData.universityStrategic;
    const strategic_plan_kpi = formData.strategicPlanKPI;
    const operational_plan_kpi = formData.operationPlanKPI;
    const project_kpi = formData.projectKPI;
    const project_status = formData.projectStatus;
    const responsible_rows = JSON.stringify(formData.responsibleRows);
    const OIVT_rows = JSON.stringify(formData.OIVTRows);
    const expected_result_rows = JSON.stringify(formData.expectedResultRows);
    const operation_duration_rows = JSON.stringify(
      formData.operationDurationRows,
    );
    const project_schedule_rows = JSON.stringify(formData.projectScheduleRows);
    const target_total = formData.targetTotal;
    const target_rows = JSON.stringify(formData.targetRows);
    const budget_income_total = formData.budgetIncomeTotal;
    const budget_income_rows = JSON.stringify(formData.budgetIncomeRows);
    const budget_expense_total = formData.budgetExpenseTotal;
    const budget_expense_rows = JSON.stringify(formData.budgetExpenseRows);
    const project_types = JSON.stringify(formData.projectTypes);
    const university_identity = JSON.stringify(formData.universityIndentity);

    const response = await pool.query(
      `
        INSERT INTO project_proposal_pn01 (
          faculty, 
          project_name, 
          project_head, 
          project_head_phone,
          project_responsible, 
          strategic_issue_id, 
          objective_id, 
          university_strategic_id, 
          strategic_plan_kpi_id, 
          operational_plan_kpi_id, 
          project_kpi_id, 
          project_status_id, 
          project_type, 
          university_identity, 
          principle_reason, 
          objective_indicator_value_tool,
          expected_result, 
          operation_duration, 
          project_location, 
          project_datetime,
          project_schedule, 
          lecturer, 
          target_total, 
          target, 
          improvement, 
          budget_income_total, 
          budget_income, 
          budget_expense_total, 
          budget_expense,
          is_draft,
          status_id,
          created_by
        )
        VALUES (
          $1, 
          $2, 
          $3, 
          $4,
          $5, 
          $6,
          $7,
          $8, 
          $9,
          $10, 
          $11, 
          $12,
          $13, 
          $14,
          $15, 
          $16,
          $17, 
          $18,
          $19, 
          $20,
          $21,
          $22,
          $23, 
          $24,
          $25, 
          $26,
          $27,
          $28, 
          $29, 
          $30,
          (SELECT id FROM pn01_status WHERE name = $31),
          (SELECT id FROM users WHERE id = $32)
        )
      `,
      [
        faculty || null,
        project_name || null,
        project_head || null,
        project_head_phone || null,
        responsible_rows,
        strategic_issue || null,
        objective || null,
        university_strategic || null,
        strategic_plan_kpi || null,
        operational_plan_kpi || null,
        project_kpi || null,
        project_status || null,
        project_types,
        university_identity,
        principle_reason || null,
        OIVT_rows,
        expected_result_rows,
        operation_duration_rows,
        project_location || null,
        project_datetime || null,
        project_schedule_rows,
        lecturer || null,
        target_total || null,
        target_rows,
        improvement || null,
        budget_income_total || null,
        budget_income_rows,
        budget_expense_total || null,
        budget_expense_rows,
        is_draft,
        PN01Status[0],
        userId,
      ],
    );

    return NextResponse.json(
      {
        message: 'Create draft project proposal success',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating draft project proposal:', error);
    return NextResponse.json(
      { message: `Server error please try again later` },
      {
        status: 500,
      },
    );
  }
}
