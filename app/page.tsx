import Card from './components/ui/Card';

export default function DashboardPage() {
  // Colores UCN para usar en las clases
  const ucnBlueText = 'text-[#003366]';
  const ucnAccentBtn = 'bg-[#D97B29] hover:bg-[#b8651f]';

  return (
    <div className="space-y-6">
      
      {/* Título y Bienvenida */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {/* Título con azul UCN */}
          <h1 className={`text-2xl font-bold ${ucnBlueText}`}>Dashboard de Ventas UCN</h1>
          <p className="text-slate-500">Resumen de rendimiento en tiempo real</p>
        </div>
        {/* Botón con naranja UCN */}
        <button className={`${ucnAccentBtn} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm`}>
          Descargar Reporte
        </button>
      </div>

      {/* ... EL RESTO DEL CÓDIGO DE LAS TARJETAS SIGUE IGUAL ... */}
      {/* (Copia el resto del archivo page.tsx anterior a partir de aquí) */}
       {/* SECCIÓN 1: KPIs (Tarjetas Superiores) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-slate-500">Ventas Totales</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">$0</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Transacciones</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Ticket Promedio</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">$0</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Sucursal Top</p>
          <p className="text-2xl font-bold text-green-600 mt-1">-</p>
        </Card>
      </div>

      {/* SECCIÓN 2: Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Evolución de Ventas" className="lg:col-span-2 min-h-[300px]">
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded border border-dashed border-slate-300 text-slate-400">
            Aquí irá el Gráfico de Líneas (Visualizador)
          </div>
        </Card>

        <Card title="Ventas por Categoría" className="min-h-[300px]">
           <div className="h-64 flex items-center justify-center bg-slate-50 rounded border border-dashed border-slate-300 text-slate-400">
            Aquí irá el Gráfico de Torta
          </div>
        </Card>
      </div>

      {/* SECCIÓN 3: Tabla Reciente */}
      <Card title="Últimas Transacciones">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Producto</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3">Monto</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Cargando datos...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}