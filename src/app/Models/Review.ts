export interface Review {
  id: number;
  email: string;
  stars: number;
  description: string | null;
  user_id: string;
}
