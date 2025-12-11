'use client';
import { useMemo } from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface Venta {
  id: number;
  estado: string;
}

interface PolarProps {
  items: Venta[];
}

export const StatusPolarChart = ({ items }: PolarProps) => {
  const chartData = useMemo(() => {
    const conteoPorEstado = items.reduce((acc, venta) => {
      const estado = venta.estado || 'Otro';
      if (!acc[estado]) acc[estado] = 0;
      acc[estado] += 1; 
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(conteoPorEstado),
      datasets: [
        {
          label: 'Cantidad de Pedidos',
          data: Object.values(conteoPorEstado),
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)', 
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 205, 86, 0.5)', 
            'rgba(255, 99, 132, 0.5)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [items]);

  return (
    <div className="w-full h-full flex justify-center bg-white p-4 rounded-lg shadow-sm">
      {items.length > 0 ? (
        <PolarArea 
            data={chartData} 
            options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                    r: { ticks: { display: false } } 
                }
            }} 
        />
      ) : (
        <div className="flex items-center justify-center text-gray-400 h-full w-full">Sin datos</div>
      )}
    </div>
  );
};