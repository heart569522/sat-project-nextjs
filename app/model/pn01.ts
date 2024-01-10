export interface PN01 {
  userId?: string;
  isDraft? : boolean;
  faculty?: string;
  projectName?: string;
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
  responsibleRows?: ResponsibleRow[];
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

interface ResponsibleRow {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  work: string;
}

interface OIVTRow {
  id: number;
  objective: string;
  indicator: string;
  value: string;
  tool: string;
}

interface ExpectedResultRow {
  id: number;
  expected_result: string;
}

interface OperationDurationRow {
  id: number;
  operation_duration: string;
}

interface ProjectScheduleRow {
  id: number;
  date: string | null;
  time: string | null;
  detail: string;
}

interface TargetRow {
  id: number;
  detail: string;
  count: string;
}

interface BudgetIncomeRow {
  id: number;
  detail: string;
  amount: string;
  source: string;
}

interface BudgetExpenseRow {
  id: number;
  detail: string;
  amount: string;
  note: string;
}

interface ProjectTypes {
  maintenance: boolean;
  academicService: boolean;
  knowledgeManagement: boolean;
  researchPromotion: boolean;
  educationQualityAssurance: boolean;
  personnelDevelopment: boolean;
  riskManagement: boolean;
  studentDevelopment: boolean;
  moralEthical: boolean;
  academicPromotion: boolean;
  knowledge: boolean;
  environment: boolean;
  intellectualSkill: boolean;
  sport: boolean;
  knowledgeAnalysisCommunicationTechnology: boolean;
  artCultureDevelopment: boolean;
  numericalAnalysisCommunicationTechnology: boolean;
  moralEthicalDevelopment: boolean;
  leadershipDevelopment: boolean;
  subOther: boolean;
  subOtherDetail: string;
  other: boolean;
  otherDetail: string;
}

interface UniversityIdentity {
  moral: boolean;
  serve: boolean;
  academic: boolean;
  develop: boolean;
}
