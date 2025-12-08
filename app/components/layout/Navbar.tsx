'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Colores UCN definidos arbitrariamente para Tailwind
  const ucnBlue = 'bg-[#003366]';
  const ucnAccentHover = 'hover:bg-[#D97B29]';

  return (
    <nav className={`${ucnBlue} text-white shadow-lg sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO UCN CON FONDO CLARO */}
          <div className="flex-shrink-0 flex items-center my-2">
            {/* Nuevo contenedor blanco para contraste */}
            <div className="bg-white p-2 rounded-md shadow-sm flex items-center justify-center">
              <img 
                src="https://campusvirtual.ucn.cl/pluginfile.php/1/theme_mb2nl/logo/1760949722/ucn_logo.png" 
                alt="Logo UCN" 
                className="h-12 w-auto" // Reducimos un poco para compensar el padding
              />
            </div>
          </div>

          {/* MENÚ DE ESCRITORIO */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className={`${ucnAccentHover} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>
                Dashboard
              </Link>
              <Link href="/metricas" className={`${ucnAccentHover} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>
                Métricas
              </Link>
              <Link href="/configuracion" className={`${ucnAccentHover} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>
                Configuración
              </Link>
            </div>
          </div>

          {/* BOTÓN HAMBURGUESA (Móvil) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-[#002244] inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#D97B29] focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              {!isOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isOpen && (
        <div className="md:hidden bg-[#002244]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={`text-gray-300 ${ucnAccentHover} hover:text-white block px-3 py-2 rounded-md text-base font-medium`}>
              Dashboard
            </Link>
            <Link href="/metricas" className={`text-gray-300 ${ucnAccentHover} hover:text-white block px-3 py-2 rounded-md text-base font-medium`}>
              Métricas
            </Link>
            <Link href="/configuracion" className={`text-gray-300 ${ucnAccentHover} hover:text-white block px-3 py-2 rounded-md text-base font-medium`}>
              Configuración
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}