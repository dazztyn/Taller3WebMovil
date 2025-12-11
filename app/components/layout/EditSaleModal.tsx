"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateVenta, Venta } from '@/lib/redux/slices/dataSlice';

interface Props {
  venta: Venta;
}

export default function EditSaleModal({ venta }: Props) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Inicializamos el formulario con los datos ACTUALES de la venta
  const [formData, setFormData] = useState({
    estado: venta.estado,
    sucursal: venta.sucursal,
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/ventas/${venta.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al actualizar');

      const ventaActualizada = await response.json();

      dispatch(updateVenta(ventaActualizada));
      
      setIsOpen(false);
      alert("¡Producto actualizado!");

    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BOTÓN PEQUEÑO DE EDITAR */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
      >
        Editar
      </button>

      {/* MODAL DE EDICIÓN */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Editar: {venta.producto}</h3>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              
              {/* Editar Estado */}
              <div>
                <label className="block text-sm font-medium">Estado</label>
                <select 
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  className="w-full border p-2 rounded"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completado">Completado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              {/* Editar Sucursal */}
              <div>
                <label className="block text-sm font-medium">Sucursal</label>
                <input 
                  type="text"
                  value={formData.sucursal}
                  onChange={(e) => setFormData({...formData, sucursal: e.target.value})}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1 text-gray-500">Cancelar</button>
                <button type="submit" disabled={loading} className="px-3 py-1 bg-blue-600 text-white rounded">
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}