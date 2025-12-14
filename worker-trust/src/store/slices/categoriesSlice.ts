import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from '@/src/store/thunks/categoriesThunk';
import { WorkerCategory } from '@/src/types/category';

interface CategoriesState {
  items: WorkerCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<WorkerCategory[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  }
});

export const { clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
