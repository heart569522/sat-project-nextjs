export interface PN10 {
  id: number;
  projectName: string;
  projectHour: string;
  projectDate: string;
  studentList: Student[];
}

interface Student {
  id: number;
  firstname: string;
  lastname: string;
  studentId: string;
}
