import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import dataReducer from './slices/dataSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      filters: filterReducer,
      data: dataReducer,
    },
  });
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];