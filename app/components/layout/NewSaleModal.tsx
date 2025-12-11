"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addVenta } from '@/lib/redux/slices/dataSlice';

export default function NewSaleModal()
{
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        producto: '',
        categoria: '',
        monto: 0,
        cantidad: 1,
        metodoPago: '',
        sucursal: 'online'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try
        {
            const response = await fetch('/api/ventas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok)
            {
                throw new Error('Error al guardar');
            }

            const nuevaVenta = await response.json();
            dispatch(addVenta(nuevaVenta));

            setIsOpen(false);
            setFormData({ producto: '', categoria: 'Tecnología', monto: 0, cantidad: 1, metodoPago: 'Tarjeta', sucursal: 'Online' });
            alert("¡Venta creada exitosamente!");
        }
        catch (error)
        {
            alert("Error al crear la venta");
        }
        finally
        {
            setLoading(false);
        }
    };

    const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
    <>
      {/* BOTÓN PARA ABRIR (Pon esto donde quieras en tu Dashboard) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow transition"
      >
        + Nueva Venta Real
      </button>

      {/* EL MODAL (Formulario) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Registrar Venta</h2>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Producto</label>
                <input required name="producto" value={formData.producto} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Ej: Monitor LED" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium">Categoría</label>
                  <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full border p-2 rounded">
                    <option>Tecnología</option>
                    <option>Muebles</option>
                    <option>Oficina</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Sucursal</label>
                  <select name="sucursal" value={formData.sucursal} onChange={handleChange} className="w-full border p-2 rounded">
                    <option>Online</option>
                    <option>Santiago</option>
                    <option>Coquimbo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium">Monto ($)</label>
                  <input required type="number" name="monto" value={formData.monto} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Cantidad</label>
                  <input required type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                  {loading ? 'Guardando...' : 'Guardar Venta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}