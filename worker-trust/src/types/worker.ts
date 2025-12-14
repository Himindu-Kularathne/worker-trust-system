export type Worker = {
  id: string;
  name: string;
  category: string;
  rating: number;
  trustScore: number;
  jobsCompleted: number;

  // Location
  province: string;
  district: string;
  city: string;
}
