export interface HistoryActivity {
  id: number;
  firstname: string;
  lastname: string;
  studentId: string;
  faculty: string;
  major: string;
  history: Project[];
}

interface Project {
  id: number;
  projectName: string;
  projectHour: string;
  year: string;
}
