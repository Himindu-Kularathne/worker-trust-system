import { createSlice } from "@reduxjs/toolkit";
import { fetchWorkerById, fetchWorkers } from "../thunks/workersThunks";
import { Worker } from "@/src/types/worker";

interface WorkersState {
  items: Worker[];
  selectedWorker: Worker | null;
  loading: boolean;
  error?: string;
}

const initialState: WorkersState = {
  items: [],
  selectedWorker: null,
  loading: false,
};

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    clearSelectedWorker(state) {
      state.selectedWorker = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all workers
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
      })

      // Fetch worker by ID
      .addCase(fetchWorkerById.pending, (state) => {
        state.loading = true;
        state.selectedWorker = null;
      })
      .addCase(fetchWorkerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWorker = action.payload;
      })
      .addCase(fetchWorkerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedWorker } = workersSlice.actions;
export default workersSlice.reducer;
