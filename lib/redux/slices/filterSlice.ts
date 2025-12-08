import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchTerm: string;
  categoria: string | null;
  sucursal: string | null;
  metodoPago: string | null;
}

const initialState: FilterState = {
  searchTerm: '',
  categoria: null,
  sucursal: null,
  metodoPago: null,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.categoria = action.payload;
    },
    setSucursal: (state, action: PayloadAction<string | null>) => {
      state.sucursal = action.payload;
    },
    setMetodoPago: (state, action: PayloadAction<string | null>) => {
      state.metodoPago = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.categoria = null;
      state.sucursal = null;
      state.metodoPago = null;
    }
  },
});

export const { 
  setSearchTerm, 
  setCategory, 
  setSucursal, 
  setMetodoPago, 
  resetFilters 
} = filterSlice.actions;

export default filterSlice.reducer;