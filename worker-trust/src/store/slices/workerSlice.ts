import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkers } from '../thunks/workersThunks';

interface WorkersState {
  items: any[];
  loading: boolean;
  error?: string;
}

const initialState: WorkersState = {
  items: [],
  loading: false
};

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default workersSlice.reducer;
