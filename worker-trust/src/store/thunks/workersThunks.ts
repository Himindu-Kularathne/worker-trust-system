import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWorkersWithFilters, getWorkerById, getWorkerReviews } from '../../lib/worker';
import { RootState } from '../index';
import { SearchFilters } from '@/src/types/worker';

export const fetchWorkers = createAsyncThunk(
  'workers/fetchWorkers',
  async (filters: SearchFilters) => {
    const response = await getAllWorkersWithFilters(filters);
    return response;
}
);
  
// fetch workers by id
export const fetchWorkerById = createAsyncThunk(
  'workers/fetchWorkerById',
  async (workerId: string) => {
    const response = await getWorkerById(workerId);
    return response;
  }
);

// fetch worker reviews
export const fetchWorkerReviews = createAsyncThunk(
  'workers/fetchWorkerReviews',
  async (workerId: string) => {
    const response = await getWorkerReviews(workerId);
    return response;
  }
);