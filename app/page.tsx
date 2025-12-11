'use client'
//Imports para los graficos
import { CategoryPieChart } from './components/charts/CategoryPieChart';
import { SalesLineChart } from './components/charts/SalesLineChart';
import './components/charts/ChartConfig';
import { BarChart } from './components/charts/BarChart';
import { KpiCard } from './components/dashboard/KpiCard';
import { PaymentDoughnutChart } from './components/charts/PaymentDoughnutChart';
import { StatusPolarChart } from './components/charts/StatusPolarChart';
//Fin de imports para los graficos

import { useMemo } from 'react';
import Card from './components/ui/Card';

// REDUX IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import { fetchDataSuccess } from '../lib/redux/slices/dataSlice';
import { setSearchTerm, setCategory } from '../lib/redux/slices/filterSlice';
import { useVentasLogic } from '../lib/redux/hooks/useVentasLogic';

export default function DashboardPage() {
  
  const dispatch = useDispatch();
  useVentasLogic(); 

  
  const { filteredItems } = useSelector((state: RootState) => state.data);
  const filters = useSelector((state: RootState) => state.filters);

  // SIMULACIÓN DE DATOS (Misma función de antes)
  const cargarDatosDePrueba = () => {
    const datosFalsos = [
      { id: 1, producto: 'Laptop Gamer', categoria: 'Tecnologia', monto: 1500000, cantidad: 1, metodoPago: 'Tarjeta', estado: 'Completado', sucursal: 'Coquimbo', fecha: '2025-12-01' },
      { id: 2, producto: 'Silla Ergonómica', categoria: 'Muebles', monto: 200000, cantidad: 2, metodoPago: 'Efectivo', estado: 'Pendiente', sucursal: 'La Serena', fecha: '2025-12-02' },
      { id: 3, producto: 'Mouse Inalámbrico', categoria: 'Tecnologia', monto: 25000, cantidad: 5, metodoPago: 'Tarjeta', estado: 'Completado', sucursal: 'Coquimbo', fecha: '2025-12-03' },
      { id: 4, producto: 'Escritorio L', categoria: 'Muebles', monto: 300000, cantidad: 1, metodoPago: 'Transferencia', estado: 'Completado', sucursal: 'Vallenar', fecha: '2025-12-04' },
      { id: 5, producto: 'Monitor 24"', categoria: 'Tecnologia', monto: 150000, cantidad: 2, metodoPago: 'Tarjeta', estado: 'Devuelto', sucursal: 'La Serena', fecha: '2025-12-05' },
    ];
    dispatch(fetchDataSuccess(datosFalsos));
  };

  // 4. CALCULAR KPI's EN TIEMPO REAL (Memoizado para rendimiento)
  const kpis = useMemo(() => {
    const totalVentas = filteredItems.reduce((acc, curr) => acc + curr.monto, 0);
    const transacciones = filteredItems.length;
    const ticketPromedio = transacciones > 0 ? totalVentas / transacciones : 0;
    
    // Lógica simple para sucursal top (solo como ejemplo)
    const sucursales = filteredItems.map(i => i.sucursal);
    const topSucursal = sucursales.sort((a,b) =>
          sucursales.filter(v => v===a).length - sucursales.filter(v => v===b).length
    ).pop() || '-';

    return { totalVentas, transacciones, ticketPromedio, topSucursal };
  }, [filteredItems]);


  // Colores UCN para usar en las clases
  const ucnBlueText = 'text-[#003366]';
  const ucnAccentBtn = 'bg-[#D97B29] hover:bg-[#b8651f]';

  return (
    <div className="space-y-6">
      
      {/* Título y Bienvenida */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${ucnBlueText}`}>Dashboard de Ventas UCN</h1>
          <p className="text-slate-500">Resumen de rendimiento en tiempo real</p>
        </div>
        <div className="flex gap-2">
            {/* BOTÓN DE PRUEBA INTEGRADO AQUÍ */}
            <button 
                onClick={cargarDatosDePrueba}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
            >
                <span></span> Simular API
            </button>
            <button className={`${ucnAccentBtn} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm`}>
                Descargar Reporte
            </button>
        </div>
      </div>

      {/* --- NUEVA SECCIÓN: BARRA DE FILTROS (Respetando diseño limpio) --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-grow w-full sm:w-auto">
            <input 
                type="text" 
                placeholder="🔍 Buscar producto..." 
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                value={filters.searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
            <button 
                onClick={() => dispatch(setCategory(null))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${!filters.categoria ? 'bg-[#003366] text-white border-[#003366]' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
            >
                Todos
            </button>
            <button 
                onClick={() => dispatch(setCategory('Tecnologia'))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filters.categoria === 'Tecnologia' ? 'bg-[#003366] text-white border-[#003366]' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
            >
                Tecnología
            </button>
            <button 
                onClick={() => dispatch(setCategory('Muebles'))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filters.categoria === 'Muebles' ? 'bg-[#003366] text-white border-[#003366]' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
            >
                Muebles
            </button>
        </div>
      </div>

      {/* SECCIÓN 1: KPIs (Tarjetas Superiores) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Reemplazamos el <Card> genérico por tu <KpiCard> */}
        
        <KpiCard 
          title="Ventas Totales" 
          value={`$${kpis.totalVentas.toLocaleString('es-CL')}`} 
          trend="+15% vs mes ant." // (Dato simulado para que se vea bonito)
        />

        <KpiCard 
          title="Transacciones" 
          value={kpis.transacciones} 
          trend="Estable"
        />

        <KpiCard 
          title="Ticket Promedio" 
          value={`$${Math.round(kpis.ticketPromedio).toLocaleString('es-CL')}`} 
        />

        <KpiCard 
          title="Sucursal Top" 
          value={kpis.topSucursal} 
          trend="Liderando"
        />
      </div>

      {/* SECCIÓN 2: Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRÁFICO 1: Ocupa 2 columnas (ancho) */}
        <Card title="Ventas por Sucursal" className="lg:col-span-2 min-h-[300px]">
          <div className="h-80 w-full">
             <BarChart items={filteredItems} /> 
          </div>
        </Card>

        {/* GRÁFICO DE LÍNEAS */}
        <Card title="Evolución de Ventas" className="lg:col-span-2 min-h-[300px]">
          <div className="h-80 w-full">
             {/* PASAMOS LOS DATOS */}
             <SalesLineChart items={filteredItems} /> 
          </div>
        </Card>

        {/* GRÁFICO DE TORTA */}
        <Card title="Ventas por Categoría" className="min-h-[300px]">
           <div className="h-80 w-full">
             {/* PASAMOS LOS DATOS */}
             <CategoryPieChart items={filteredItems} />
          </div>
        </Card>
      </div>
      

      {/* SECCIÓN 2.5: Gráficos Secundarios (Dona y Polar) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* GRÁFICO de Dona */}
        <Card title="Ingresos por Método de Pago" className="min-h-[300px]">
          <div className="h-72 w-full">
             <PaymentDoughnutChart items={filteredItems} />
          </div>
        </Card>

        {/* GRÁFICO Polar */}
        <Card title="Estado de los Pedidos" className="min-h-[300px]">
           <div className="h-72 w-full">
             <StatusPolarChart items={filteredItems} />
          </div>
        </Card>
      </div>

      {/* SECCIÓN 3: Tabla Reciente - AHORA CON DATOS REALES */}
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
              {filteredItems.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">
                        {filters.searchTerm || filters.categoria ? 'No se encontraron resultados con esos filtros.' : 'No hay datos cargados. Presiona "Simular API".'}
                    </td>
                 </tr>
              ) : (
                  filteredItems.map((venta) => (
                    <tr key={venta.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{venta.id}</td>
                        <td className="px-6 py-4">{venta.producto}</td>
                        <td className="px-6 py-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {venta.categoria}
                            </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700">
                            ${venta.monto.toLocaleString('es-CL')}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded 
                                ${venta.estado === 'Completado' ? 'bg-green-100 text-green-800' : 
                                  venta.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {venta.estado}
                            </span>
                        </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}