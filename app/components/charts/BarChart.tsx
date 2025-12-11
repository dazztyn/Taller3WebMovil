'use client';
import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react'; 


interface Venta {
  id: number;
  sucursal: string;
  monto: number;
}

interface BarChartProps {
  items: Venta[];
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Ventas por Sucursal' },
  },
};

export const BarChart = ({ items }: BarChartProps) => {

 
  const chartData = useMemo(() => {
    
    const ventasPorSucursal = items.reduce((acc, venta) => {
      const sucursal = venta.sucursal || 'Sin Sucursal';
      if (!acc[sucursal]) {
        acc[sucursal] = 0;
      }
      acc[sucursal] += venta.monto;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(ventasPorSucursal);
    const dataValues = Object.values(ventasPorSucursal);

    return {
      labels,
      datasets: [
        {
          label: 'Monto Total ($)',
          data: dataValues,
          backgroundColor: 'rgba(53, 162, 235, 0.6)',
          borderColor: 'rgba(53, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [items]);

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-md">
       {items.length > 0 ? (
          <Bar options={options} data={chartData} />
       ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No hay datos para mostrar
          </div>
       )}
    </div>
  );
};