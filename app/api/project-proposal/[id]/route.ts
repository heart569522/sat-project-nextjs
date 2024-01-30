import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { PN01 } from '@/app/model/pn01';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query<PN01>(
      `SELECT * FROM project_proposal_pn01 WHERE is_delete = false AND id = $1`,
      [id],
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

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const formData = await req.json();
    const { id } = context.params;

    const faculty = formData.faculty;
    const project_name = formData.projectName;
    const project_year = formData.projectYear;
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

    const res = await pool.query(
      `
      UPDATE project_proposal_pn01
      SET
        faculty = $1,
        project_name = $2,
        project_year = $3,
        project_head = $4,
        project_head_phone = $5,
        project_responsible = $6,
        strategic_issue_id = $7,
        objective_id = $8,
        university_strategic_id = $9,
        strategic_plan_kpi_id = $10,
        operational_plan_kpi_id = $11,
        project_kpi_id = $12,
        project_status_id = $13,
        project_type = $14,
        university_identity = $15,
        principle_reason = $16,
        objective_indicator_value_tool = $17,
        expected_result = $18,
        operation_duration = $19,
        project_location = $20,
        project_datetime = $21,
        project_schedule = $22,
        lecturer = $23,
        target_total = $24,
        target = $25,
        improvement = $26,
        budget_income_total = $27,
        budget_income = $28,
        budget_expense_total = $29,
        budget_expense = $30,
        is_edit = $31
      WHERE id = $32
    `,
      [
        faculty,
        project_name,
        project_year,
        project_head,
        project_head_phone,
        responsible_rows,
        strategic_issue,
        objective,
        university_strategic,
        strategic_plan_kpi,
        operational_plan_kpi,
        project_kpi,
        project_status,
        project_types,
        university_identity,
        principle_reason,
        OIVT_rows,
        expected_result_rows,
        operation_duration_rows,
        project_location,
        project_datetime,
        project_schedule_rows,
        lecturer,
        target_total,
        target_rows,
        improvement,
        budget_income_total,
        budget_income_rows,
        budget_expense_total,
        budget_expense_rows,
        false,
        id,
      ],
    );

    return NextResponse.json(
      {
        message: 'Update project proposal success',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Server error please try again later`,
        error,
      },
      { status: 500 },
    );
  }
    
}
