import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { filterData } from '../slices/dataSlice';

export const useVentasLogic = () => {
  const dispatch = useDispatch<AppDispatch>();

  // 1. Extraemos los valores actuales del Store
  const filters = useSelector((state: RootState) => state.filters);
  const allVentas = useSelector((state: RootState) => state.data.items);

  // 2. El "Cerebro": Cada vez que cambian los filtros o llegan datos nuevos,
  // despachamos la acción filterData al slice.
  useEffect(() => {
    dispatch(filterData({
      searchTerm: filters.searchTerm,
      categoria: filters.categoria,
      sucursal: filters.sucursal,
      metodoPago: filters.metodoPago
    }));
  }, [filters, allVentas, dispatch]); 
  
};