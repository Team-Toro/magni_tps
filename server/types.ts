export type CourseRow = {
  id: string;
  title: string;
  description: string;
  price_ars: number;
  is_active: number;
};

export type OrderRow = {
  id: number;
  course_id: string;
  status: 'created' | 'approved' | 'rejected';
  preference_id: string | null;
  payment_id: string | null;
  created_at: string;
  updated_at: string;
};
