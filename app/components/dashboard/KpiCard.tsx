import React from 'react';


interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode; 
  trend?: string;
}

export const KpiCard = ({ title, value, trend }: KpiCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        {/* Aquí poner un ícono*/}
        <div className="p-2 bg-blue-50 rounded-lg">
           📈
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600 font-medium">{trend}</span>
          <span className="text-gray-400 ml-2">vs mes anterior</span>
        </div>
      )}
    </div>
  );
};