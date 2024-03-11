export interface PN10 {
  id: string;
  project_name: string;
  project_hour: string;
  project_year: string;
  project_code: string;
  students: StudentList[];
  is_delete: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface StudentList {
  id: number
  Std?: string;
  Name?: string;
  AcademicYear?: string;
  ProjectName?: string;
  remark?: string;
}
