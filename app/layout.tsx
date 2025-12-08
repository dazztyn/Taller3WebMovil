import './globals.css';
import Navbar from './components/layout/Navbar';
import StoreProvider from './StoreProvider';

export const metadata = {
  title: 'DataMobile Dashboard',
  description: 'Panel de control de datos en tiempo real',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-100 min-h-screen flex flex-col">
        <StoreProvider>
          <Navbar />
          <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
          <footer className="bg-[#003366] text-gray-300 text-center py-4 text-sm">
            © 2025 DataMobile - Taller 3 Web Móvil
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}