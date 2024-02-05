import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { PN01 } from '@/app/model/pn01';
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

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const formData = await req.json();
    const { id } = context.params;

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
        UPDATE project_proposal_pn01
        SET
          faculty = $1,
          project_name = $2,
          project_head = $3,
          project_head_phone = $4,
          project_responsible = $5,
          strategic_issue_id = $6,
          objective_id = $7,
          university_strategic_id = $8,
          strategic_plan_kpi_id = $9,
          operational_plan_kpi_id = $10,
          project_kpi_id = $11,
          project_status_id = $12,
          project_type = $13,
          university_identity = $14,
          principle_reason = $15,
          objective_indicator_value_tool = $16,
          expected_result = $17,
          operation_duration = $18,
          project_location = $19,
          project_datetime = $20,
          project_schedule = $21,
          lecturer = $22,
          target_total = $23,
          target = $24,
          improvement = $25,
          budget_income_total = $26,
          budget_income = $27,
          budget_expense_total = $28,
          budget_expense = $29
        WHERE
          id = $30;
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
    console.log('error', error);
    return NextResponse.json(
      {
        message: `Server error please try again later`,
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

    const project_year = formData.projectYear;
    const project_code = await generateProjectCode(project_year);

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
      UPDATE project_proposal_pn01
      SET
        project_code = '${project_code}',
        date = '${date}', 
        time = '${time}',
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
        is_draft = false,
        status_id = (SELECT id FROM pn01_status WHERE name = '${PN01Status[1]}')
      WHERE id = '${id}';
    `,
    );

    return NextResponse.json(
      {
        message: 'Update project proposal success',
      },
      { status: 200 },
    );
  } catch (error) {
    console.log('error', error);

    return NextResponse.json(
      {
        message: `Server error please try again later`,
        error,
      },
      { status: 500 },
    );
  }
}
