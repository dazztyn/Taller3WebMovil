'use client';
import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Venta {
  id: number;
  categoria: string;
  monto: number;
}

interface PieChartProps {
  items: Venta[];
}

export const CategoryPieChart = ({ items }: PieChartProps) => {
  
  const chartData = useMemo(() => {
    const ventasPorCategoria = items.reduce((acc, venta) => {
      const cat = venta.categoria || 'Sin Categoría';
      if (!acc[cat]) {
        acc[cat] = 0;
      }
      acc[cat] += venta.monto;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(ventasPorCategoria);
    const dataValues = Object.values(ventasPorCategoria);

    return {
      labels,
      datasets: [
        {
          label: 'Ventas por Categoría ($)',
          data: dataValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)', 
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)', 
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [items]);

  return (
    <div className="w-full h-full flex justify-center bg-white p-4 rounded-lg shadow-sm">
       {items.length > 0 ? (
          <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
       ) : (
          <div className="flex items-center justify-center text-gray-400 h-full w-full">
            Sin datos
          </div>
       )}
    </div>
  );
};