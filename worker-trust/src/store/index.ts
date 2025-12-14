import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import workersReducer from './slices/workerSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    workers: workersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
