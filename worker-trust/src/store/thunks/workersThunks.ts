import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWorkersWithFilters } from '../../lib/worker';
import { RootState } from '../index';
import { SearchFilters } from '@/src/types/worker';

export const fetchWorkers = createAsyncThunk(
  'workers/fetchWorkers',
  async (filters: SearchFilters) => {
    const response = await getAllWorkersWithFilters(filters);
    return response;
}
);
  