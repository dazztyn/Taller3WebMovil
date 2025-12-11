import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Definimos el tipo exacto basado en tu tabla 'Venta'
export interface Venta {
  id: number;
  producto: string;
  categoria: string;
  monto: number;     
  cantidad: number;  
  metodoPago: string;
  estado: string;
  sucursal: string;
  fecha: string;     
  
}

interface DataState {
  items: Venta[];
  filteredItems: Venta[];  
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<Venta[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.loading = false;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    filterData: (state, action: PayloadAction<{
      searchTerm: string;
      categoria: string | null;
      sucursal: string | null;
      metodoPago: string | null;
    }>) => {
      const { searchTerm, categoria, sucursal, metodoPago } = action.payload;

      state.filteredItems = state.items.filter((venta) => {
        
        const matchesSearch = venta.producto.toLowerCase().includes(searchTerm.toLowerCase());
        
        
        const matchesCategory = categoria ? venta.categoria === categoria : true;
        const matchesSucursal = sucursal ? venta.sucursal === sucursal : true;
        const matchesPago = metodoPago ? venta.metodoPago === metodoPago : true;

        
        return matchesSearch && matchesCategory && matchesSucursal && matchesPago;
      });
    },
    
    addVenta: (state, action: PayloadAction<Venta>) => {
      state.items.unshift(action.payload);
      state.filteredItems.unshift(action.payload);
    }
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, filterData, addVenta } = dataSlice.actions;
export default dataSlice.reducer;