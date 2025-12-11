'use client';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Venta {
  id: number;
  fecha: string | Date; 
  monto: number;
}

interface LineChartProps {
  items: Venta[];
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Evolución de Ventas' },
  },
};

export const SalesLineChart = ({ items }: LineChartProps) => {

  const chartData = useMemo(() => {
    const ventasPorFecha = items.reduce((acc, venta) => {
      const fechaObj = new Date(venta.fecha);
      const fechaStr = fechaObj.toLocaleDateString('es-CL'); 
      
      if (!acc[fechaStr]) {
        acc[fechaStr] = 0;
      }
      acc[fechaStr] += venta.monto;
      return acc;
    }, {} as Record<string, number>);

    const labelsOrdenados = Object.keys(ventasPorFecha).sort((a,b) => {

        const [diaA, mesA, anoA] = a.split('/').map(Number);
        const [diaB, mesB, anoB] = b.split('/').map(Number);
        return new Date(anoA, mesA-1, diaA).getTime() - new Date(anoB, mesB-1, diaB).getTime();
    });
    
    const dataValues = labelsOrdenados.map(fecha => ventasPorFecha[fecha]);

    return {
      labels: labelsOrdenados,
      datasets: [
        {
          label: 'Ingresos ($)',
          data: dataValues,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.3,
        },
      ],
    };
  }, [items]);

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-sm">
      {items.length > 0 ? (
        <Line options={options} data={chartData} />
      ) : (
        <div className="flex items-center justify-center text-gray-400 h-full">
            Esperando datos...
        </div>
      )}
    </div>
  );
};