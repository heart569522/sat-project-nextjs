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

    return NextResponse.json(res.rows[0], { status: 200 });
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
        faculty = '${faculty}',
        project_name = '${project_name}',
        project_year = '${project_year}',
        project_head = '${project_head}',
        project_head_phone = '${project_head_phone}',
        project_responsible = '${responsible_rows}',
        strategic_issue_id = '${strategic_issue}', 
        strategic_issue = (SELECT name FROM strategic_issue_list WHERE id = '${strategic_issue}'), 
        objective_id = '${objective}', 
        objective = (SELECT name FROM objective_list WHERE id = '${objective}'),
        university_strategic_id = '${university_strategic}', 
        university_strategic = (SELECT name FROM university_strategic_list WHERE id = '${university_strategic}'),
        strategic_plan_kpi_id = '${strategic_plan_kpi}',  
        strategic_plan_kpi = (SELECT name FROM strategic_plan_kpi_list WHERE id = '${strategic_plan_kpi}'),
        operational_plan_kpi_id = '${operational_plan_kpi}',   
        operational_plan_kpi = (SELECT name FROM operational_plan_kpi_list WHERE id = '${operational_plan_kpi}'),
        project_kpi_id = '${project_kpi}',   
        project_kpi = (SELECT name FROM project_kpi_list WHERE id = '${project_kpi}'),
        project_status_id = '${project_status}', 
        project_status = (SELECT name FROM project_status_list WHERE id = '${project_status}'),
        project_type = '${project_types}',
        university_identity = '${university_identity}',
        principle_reason = '${principle_reason}',
        objective_indicator_value_tool = '${OIVT_rows}',
        expected_result = '${expected_result_rows}',
        operation_duration = '${operation_duration_rows}',
        project_location = '${project_location}',
        project_datetime = '${project_datetime}',
        project_schedule = '${project_schedule_rows}',
        lecturer = '${lecturer}',
        target_total = '${target_total}',
        target = '${target_rows}',
        improvement = '${improvement}',
        budget_income_total = '${budget_income_total}',
        budget_income = '${budget_income_rows}',
        budget_expense_total = '${budget_expense_total}',
        budget_expense = '${budget_expense_rows}',
        is_edit = false
      WHERE id = '${id}'
    `,
    );

    return NextResponse.json(
      {
        message: 'Update project proposal success',
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("🚀 ~ error:", error)
    return NextResponse.json(
      {
        message: `Server error please try again later`,
        error,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query(
      `
      UPDATE project_proposal_pn01
      SET is_delete = true
      WHERE id = $1
      RETURNING *;
      `,
      [id],
    );

    return NextResponse.json(res.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Can not update data!!',
        error,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const res = await pool.query(
      `
      DELETE FROM project_proposal_pn01
      WHERE id = $1
      RETURNING *;
      `,
      [id],
    );

    return NextResponse.json(res.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Can not delete data!!',
        error,
      },
      { status: 500 },
    );
  }
}
