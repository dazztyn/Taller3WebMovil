"use client";

import { useDispatch } from 'react-redux';
import { deleteVenta } from '@/lib/redux/slices/dataSlice';

interface Props {
  id: number;
}

export default function DeleteButton({ id }: Props) {
  const dispatch = useDispatch();

  const handleDelete = async () => {

    //Mensaje de confirmación
    const confirmado = window.confirm("¿Estás seguro de eliminar esta venta? Esta acción no se puede deshacer.");
    if (!confirmado) return;

    try {
      
      const response = await fetch(`/api/ventas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Error al eliminar");

      dispatch(deleteVenta(id));
      alert("Venta eliminada correctamente");

    } catch (error) {
      console.error(error);
      alert("Hubo un error al intentar eliminar.");
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 text-sm font-semibold hover:underline ml-4"
    >
      Eliminar
    </button>
  );
}