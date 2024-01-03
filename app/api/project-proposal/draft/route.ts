import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

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
    const responsible_rows = formData.responsibleRows;
    const OIVT_rows = formData.OIVTRows;
    const expected_result_rows = formData.expectedResultRows;
    const operation_duration_rows = formData.operationDurationRows;
    const project_schedule_rows = formData.formattedProjectScheduleRows;
    const target_total = formData.targetTotal;
    const target_rows = formData.targetRows;
    const budget_income_total = formData.budgetIncomeTotal;
    const budget_income_rows = formData.budgetIncomeRows;
    const budget_expense_total = formData.budgetExpenseTotal;
    const budget_expense_rows = formData.budgetExpenseRows;
    const project_types = formData.projectTypes;
    const university_identity = formData.universityIdentity;

    const res = await sql`
        INSERT INTO project_proposal_pn01 (
            project_code, date, time, faculty, project_name, project_head, project_head_phone,
            project_responsible, strategic_issue_id, objective_id, university_strategic_id,
            strategic_plan_kpi_id, operational_plan_kpi_id, project_kpi_id, project_status_id,
            project_type, university_identity, principle_reason, objective_indicator_value_tool,
            expected_result, operation_duration, project_location, project_datetime,
            project_schedule, lecturer, target_total, target, improvement, budget_income_total, budget_income, budget_expense_total, budget_expense,
            is_delete, created_at, update_at, status
        )
        VALUES (
            ${formData.project_code}, ${formData.date}, ${formData.time}, ${faculty},
            ${project_name}, ${project_head}, ${project_head_phone},
            ${responsible_rows}, ${strategic_issue}, ${objective},
            ${university_strategic}, ${strategic_plan_kpi}, ${operational_plan_kpi},
            ${project_kpi}, ${project_status}, ${project_types},
            ${university_identity}, ${principle_reason},
            ${OIVT_rows}, ${expected_result_rows},
            ${operation_duration_rows}, ${project_location}, ${project_datetime},
            ${project_schedule_rows}, ${lecturer}, ${target_total}, ${target_rows},
            ${improvement}, ${budget_income_total}, ${budget_income_rows}, ${budget_expense_total}, ${budget_expense_rows},
            false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'แบบร่าง'
        )
    `;

    return NextResponse.json({ message: 'Create Project Proposal Success' });
  } catch (error) {
    console.error('Error creating project proposal:', error);
    return NextResponse.json({
      message: 'Can not create project proposal!!',
      error,
    });
  }
}
