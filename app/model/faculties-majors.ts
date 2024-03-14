export type Faculties = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Majors = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  faculty_id: number;
};
