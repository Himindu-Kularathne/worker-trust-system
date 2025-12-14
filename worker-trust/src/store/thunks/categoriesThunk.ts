import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadCategories } from '@/src/lib/categories';

export interface WorkerCategory {
  id: string;
  title: string;
  icon: string;
}

export const fetchCategories = createAsyncThunk<
  WorkerCategory[],
  void,
  { rejectValue: string }
>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await loadCategories();
      return data ?? [];
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Failed to load categories');
    }
  }
);
