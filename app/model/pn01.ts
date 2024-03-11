export interface PN01 {
  id?: string;
  userId?: string;
  isDraft?: boolean;
  faculty?: string;
  projectName?: string;
  projectYear?: string;
  projectHead?: string;
  projectHeadPhone?: string;
  principleReason?: string;
  projectLocation?: string;
  projectDatetime?: string | null;
  lecturer?: string;
  improvement?: string;
  strategicIssue?: string;
  objective?: string;
  universityStrategic?: string;
  strategicPlanKPI?: string;
  operationPlanKPI?: string;
  projectKPI?: string;
  projectStatus?: string;
  studentRows?: ResponsibleRow[];
  OIVTRows?: OIVTRow[];
  expectedResultRows?: ExpectedResultRow[];
  operationDurationRows?: OperationDurationRow[];
  projectScheduleRows?: ProjectScheduleRow[];
  targetTotal?: string;
  targetRows?: TargetRow[];
  budgetIncomeTotal?: string;
  budgetIncomeRows?: BudgetIncomeRow[];
  budgetExpenseTotal?: string;
  budgetExpenseRows?: BudgetExpenseRow[];
  projectTypes?: ProjectTypes;
  universityIndentity?: UniversityIdentity;
}

export interface PaperPN01 {
  id?: string;
  project_code?: string;
  date?: string;
  time?: string;
  faculty?: string;
  project_name?: string;
  project_head?: string;
  project_head_phone?: string;
  project_responsible?: ResponsibleRow[];
  strategic_issue_id?: number;
  objective_id?: number;
  university_strategic_id?: number;
  strategic_plan_kpi_id?: number;
  operational_plan_kpi_id?: number;
  project_kpi_id?: number;
  project_status_id?: number;
  project_type?: ProjectTypes;
  university_identity?: UniversityIdentity;
  principle_reason?: string;
  objective_indicator_value_tool?: OIVTRow[];
  expected_result?: ExpectedResultRow[];
  operation_duration?: OperationDurationRow[];
  project_location?: string;
  project_datetime?: string;
  project_schedule?: ProjectScheduleRow[];
  lecturer?: string;
  target?: TargetRow[];
  improvement?: string;
  budget_income?: BudgetIncomeRow[];
  budget_expense?: BudgetExpenseRow[];
  is_delete?: boolean;
  target_total?: string;
  budget_expense_total?: string;
  budget_income_total?: string;
  created_at?: string;
  updated_at?: string | null;
  created_by?: string;
  is_draft?: boolean;
  is_edit?: boolean;
  project_year?: string;
  status_remark?: string | null;
  strategic_issue?: string;
  objective?: string;
  university_strategic?: string;
  strategic_plan_kpi?: string;
  operational_plan_kpi?: string;
  project_kpi?: string;
  project_status?: string;
  status_id?: number;
}

export interface ResponsibleRow {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  work: string;
}

export interface OIVTRow {
  id: number;
  objective: string;
  indicator: string;
  value: string;
  tool: string;
}

export interface ExpectedResultRow {
  id: number;
  expected_result: string;
}

export interface OperationDurationRow {
  id: number;
  operation_duration: string;
}

export interface ProjectScheduleRow {
  id: number;
  date: string | null;
  time: string | null;
  detail: string;
}

export interface TargetRow {
  id: number;
  detail: string;
  count: string;
}

export interface BudgetIncomeRow {
  id: number;
  detail: string;
  amount: string;
  source: string;
}

export interface BudgetExpenseRow {
  id: number;
  detail: string;
  amount: string;
  note: string;
}

export interface ProjectTypes {
  maintenance: boolean;
  academic_service: boolean;
  knowledge_management: boolean;
  research_promotion: boolean;
  education_quality_assurance: boolean;
  personnel_development: boolean;
  risk_management: boolean;
  student_development: boolean;
  moral_ethical: boolean;
  academic_promotion: boolean;
  knowledge: boolean;
  environment: boolean;
  intellectual_skill: boolean;
  sport: boolean;
  knowledge_analysis_communication_technology: boolean;
  art_culture_development: boolean;
  numerical_analysis_communication_technology: boolean;
  moral_ethical_development: boolean;
  leadership_development: boolean;
  sub_other: boolean;
  sub_other_detail: string;
  other: boolean;
  other_detail: string;
}

export interface UniversityIdentity {
  moral: boolean;
  serve: boolean;
  academic: boolean;
  develop: boolean;
}
