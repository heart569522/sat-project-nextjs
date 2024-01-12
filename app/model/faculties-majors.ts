export type Faculties = {
  id: number;
  name: string;
  create_at: string;
  update_at: string;
};

export type Majors = {
  id: number;
  name: string;
  create_at: string;
  update_at: string;
  faculty_id: number;
};
