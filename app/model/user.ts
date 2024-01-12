export type Users = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  role: string;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
  faculty_id?: number;
  major_id?: number;
};
