import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentDateAndTime } from '@/app/lib/services';
import { PN01Status } from '@/app/model/pn01-status';

async function generateProjectCode(projectYear: string) {
  const yearDigits = projectYear.slice(-2); // Last two digits of the project year

  // Find the maximum project code within the range of current and next year
  const latestProject = await pool.query(`
    SELECT MAX(CAST(project_code AS INTEGER)) AS max_project_code
    FROM project_proposal_pn01
    WHERE project_code LIKE '${yearDigits}%'
  `);

  // Determine the runningNumber
  let runningNumber = 1;
  if (
    latestProject.rows.length > 0 &&
    latestProject.rows[0].max_project_code !== null
  ) {
    runningNumber = latestProject.rows[0].max_project_code + 1;
  }

  // Ensure the runningNumber does not exceed 999
  runningNumber = runningNumber % 1000;

  // Format the runningNumber to be three digits (padded with leading zeros)
  const formattedRunningNumber = runningNumber.toString().padStart(3, '0');

  return `${yearDigits}${formattedRunningNumber}`;
}

export async function GET() {
  try {
    const res = await pool.query(
      `SELECT * FROM project_proposal_pn01 WHERE is_delete = false ORDER BY id`,
    );

    const data = res.rows;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server error please try again later` },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const project_year = formData.projectYear;
    const projectCode = await generateProjectCode(project_year);

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

    const datetime = getCurrentDateAndTime();
    const date = datetime.date;
    const time = datetime.time;

    const response = await pool.query(`
        INSERT INTO project_proposal_pn01 (
            project_code, date, time, faculty, project_name, project_year, project_head, project_head_phone,
            project_responsible, strategic_issue_id, objective_id, university_strategic_id,
            strategic_plan_kpi_id, operational_plan_kpi_id, project_kpi_id, project_status_id,
            project_type, university_identity, principle_reason, objective_indicator_value_tool,
            expected_result, operation_duration, project_location, project_datetime,
            project_schedule, lecturer, target_total, target, improvement, budget_income_total, budget_income, budget_expense_total, budget_expense,
            status, created_by
        )
        VALUES (
            '${projectCode}', '${date}', '${time}', '${faculty}',
            '${project_name}', '${project_year}', '${project_head}', '${project_head_phone}',
            '${responsible_rows}', '${strategic_issue}', '${objective}',
            '${university_strategic}', '${strategic_plan_kpi}', '${operational_plan_kpi}',
            '${project_kpi}', '${project_status}', '${project_types}',
            '${university_identity}', '${principle_reason}',
            '${OIVT_rows}', '${expected_result_rows}',
            '${operation_duration_rows}', '${project_location}', '${project_datetime}',
            '${project_schedule_rows}', '${lecturer}', '${target_total}', '${target_rows}',
            '${improvement}', '${budget_income_total}', '${budget_income_rows}', '${budget_expense_total}', '${budget_expense_rows}',
            '${PN01Status['กรุณานำส่งเอกสาร พน.01']}', (SELECT id FROM users WHERE id = '${userId}')
        )
        RETURNING id;
    `);

    return NextResponse.json(
      {
        message: 'Create new project proposal success',
        id: response.rows[0].id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating project proposal:', error);
    return NextResponse.json(
      { message: `Server error please try again later` },
      {
        status: 500,
      },
    );
  }
}
