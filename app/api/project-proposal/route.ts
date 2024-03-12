import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentDateAndTime } from '@/app/lib/services';
import { PN01Status } from '@/app/model/pn01-status';

async function generateProjectCode(projectYear: string) {
  try {
    const yearDigits = projectYear.slice(-2); // Last two digits of the project year

    // Find the maximum project code within the range of current and next year
    const latestProject = await pool.query(
      `SELECT MAX(CAST(project_code AS INTEGER)) AS max_project_code
       FROM project_proposal_pn01
       WHERE project_code LIKE '${yearDigits}%';`,
    );

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
  } catch (error) {
    console.error('Error generating project code:', error);
    throw error; // Rethrow the error to propagate it up the call stack
  }
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

    const response = await pool.query(
      `
        INSERT INTO project_proposal_pn01 (
            project_code, 
            date, 
            time, 
            faculty, 
            project_name, 
            project_year, 
            project_head, 
            project_head_phone,
            project_responsible, 
            strategic_issue_id, 
            strategic_issue, 
            objective_id, 
            objective, 
            university_strategic_id, 
            university_strategic, 
            strategic_plan_kpi_id, 
            strategic_plan_kpi, 
            operational_plan_kpi_id, 
            operational_plan_kpi, 
            project_kpi_id, 
            project_kpi, 
            project_status_id, 
            project_status,
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
            status_id,
            created_by
        )
        VALUES (
            $1, -- projectCode
            $2, -- date
            $3, -- time
            $4, -- faculty
            $5, -- project_name
            $6, -- project_year
            $7, -- project_head
            $8, -- project_head_phone
            $9, -- responsible_rows
            $10, -- strategic_issue
            (SELECT name FROM strategic_issue_list WHERE id = $11), -- strategic_issue_name
            $12, -- objective
            (SELECT name FROM objective_list WHERE id = $13), -- objective_name
            $14, -- university_strategic
            (SELECT name FROM university_strategic_list WHERE id = $15), -- university_strategic_name
            $16, -- strategic_plan_kpi
            (SELECT name FROM strategic_plan_kpi_list WHERE id = $17), -- strategic_plan_kpi_name
            $18, -- operational_plan_kpi
            (SELECT name FROM operational_plan_kpi_list WHERE id = $19), -- operational_plan_kpi_name
            $20, -- project_kpi
            (SELECT name FROM project_kpi_list WHERE id = $21), -- project_kpi_name
            $22, -- project_status
            (SELECT name FROM project_status_list WHERE id = $23), -- project_status_name
            $24, -- project_types
            $25, -- university_identity
            $26, -- principle_reason
            $27, -- OIVT_rows
            $28, -- expected_result_rows
            $29, -- operation_duration_rows
            $30, -- project_location
            $31, -- project_datetime
            $32, -- project_schedule_rows
            $33, -- lecturer
            $34, -- target_total
            $35, -- target_rows
            $36, -- improvement
            $37, -- budget_income_total
            $38, -- budget_income_rows
            $39, -- budget_expense_total
            $40, -- budget_expense_rows
            $41, -- status_id
            (SELECT id FROM users WHERE id = $42) -- user_id
        )
        RETURNING id;
      `,
      [
        projectCode,
        date,
        time,
        faculty,
        project_name,
        project_year,
        project_head,
        project_head_phone,
        responsible_rows,
        strategic_issue,
        strategic_issue,
        objective,
        objective,
        university_strategic,
        university_strategic,
        strategic_plan_kpi,
        strategic_plan_kpi,
        operational_plan_kpi,
        operational_plan_kpi,
        project_kpi,
        project_kpi,
        project_status,
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
        '1',
        userId,
      ],
    );

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
