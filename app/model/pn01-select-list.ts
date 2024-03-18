export type pn01SelectList = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
};

export type strategic_issue_list = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
};

export type objective_list = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
  strategic_issue_id: number;
};

export type university_strategic_list = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
  objective_id: number;
};

export type strategic_plan_kpi_list = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
};

export type operational_plan_kpi_list = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
};

export type project_kpi_list = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
};

export type project_status_list = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
};
