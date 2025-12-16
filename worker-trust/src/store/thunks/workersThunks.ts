import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWorkersWithFilters, getWorkerById } from '../../lib/worker';
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