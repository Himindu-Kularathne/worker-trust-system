import { createSlice } from "@reduxjs/toolkit";
import { fetchWorkerById, fetchWorkerReviews, fetchWorkers, submitWorkerReviews } from "../thunks/workersThunks";
import { Worker, WorkerReview } from "@/src/types/worker";

interface WorkersState {
  items: Worker[];
  selectedWorker: Worker | null;
  selectedWorkerReviews?: WorkerReview[];
  loading: boolean;
  showSuccess: boolean;
  error?: string;
}

const initialState: WorkersState = {
  items: [],
  selectedWorker: null,
  selectedWorkerReviews: [],
  loading: false,
  showSuccess: false,
};

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    clearSelectedWorker(state) {
      state.selectedWorker = null;
      state.selectedWorkerReviews = [];
    },

    clearReviewSuccess(state) {
      state.showSuccess = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
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
      })

      // Fetch worker reviews
      .addCase(fetchWorkerReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkerReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWorkerReviews = action.payload;
      })
      .addCase(fetchWorkerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Submit worker review
      .addCase(submitWorkerReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitWorkerReviews.fulfilled, (state) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(submitWorkerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedWorker, clearReviewSuccess, setLoading } = workersSlice.actions;

export default workersSlice.reducer;
