export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  phone_number?: string;
  address?: string;
  dob?: string;
  roles: Array<string>;
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
  status: string;
  point: number;
};

export type Role = {
  id: number;
  role: string;
};

export type Student = {
  account_id: string;
  grade_level: string;
  school: string;
};

export type Report = {
  report_id: string;
  account_id: string;
  exam_id: string;
  total_time: number;
  total_time_pen: number;
  total_change_pen: number;
  total_skip_pen: number;
  final_score: number;
};

export type ReportDetail = {
  report_detail_id: string;
  report_id: string;
  question_id: string;
  time_taken: number;
  is_correct: boolean;
  time_pen: number;
  change_pen: number;
  skip_pen: number;
  score: number;
};
