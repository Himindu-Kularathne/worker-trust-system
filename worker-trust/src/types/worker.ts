export type Worker = {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
  address: string;
  category: string;
  image_url?: string;
  description: string;
  rating: number;
  trust_score: number;
  review_count: number;
  province: string;
  district: string;
  city: string;
};

export type SearchFilters = {
  category?: string;
  province?: string;
  district?: string;
  city?: string;
};

export type WorkerReview = {
  id: string;
  worker_id: string;
  rating: number;
  review: string;
  created_at: string;
};
