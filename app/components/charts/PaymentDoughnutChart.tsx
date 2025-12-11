'use client';
import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Venta {
  id: number;
  metodoPago: string;
  monto: number;
}

interface DoughnutProps {
  items: Venta[];
}

export const PaymentDoughnutChart = ({ items }: DoughnutProps) => {
  const chartData = useMemo(() => {

    const porMetodo = items.reduce((acc, venta) => {
      const metodo = venta.metodoPago || 'Desconocido';
      if (!acc[metodo]) acc[metodo] = 0;
      acc[metodo] += venta.monto;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(porMetodo),
      datasets: [
        {
          label: 'Monto ($)',
          data: Object.values(porMetodo),
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)', 
            'rgba(255, 159, 64, 0.6)',
            'rgba(153, 102, 255, 0.6)', 
            'rgba(201, 203, 207, 0.6)', 
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(201, 203, 207, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [items]);

  return (
    <div className="w-full h-full flex justify-center bg-white p-4 rounded-lg shadow-sm">
      {items.length > 0 ? (
        <Doughnut 
          data={chartData} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' as const } 
            }
          }} 
        />
      ) : (
        <div className="flex items-center justify-center text-gray-400 h-full w-full">Sin datos</div>
      )}
    </div>
  );
};