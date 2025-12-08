interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ${className}`}>
      {title && (
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
            {title}
          </h3>
        </div>
      )}
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
}