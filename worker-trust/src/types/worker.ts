export type Worker = {
  id: string;
  full_name: string;
  category: string;
  rating: number;
  trustScore: number;
  jobsCompleted: number;

  // Location
  province: string;
  district: string;
  city: string;
}

export type SearchFilters = {
  category?: string;
  province?: string;
  district?: string;
  city?: string;
};
