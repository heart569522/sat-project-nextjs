export interface OriginalDataHistory {
  data: OriginalHistory[]
}

export interface OriginalHistory {
  name: string;
  studentId: number;
  projectName: string;
  academicYear: number;
  serviceHour: number;
}

export interface HistoryActivity {
  name: string
  studentId: string;
  history: Project[];
}

export interface Project {
  id: number;
  projectName: string;
  academicYear: string;
  serviceHour: string;
}
