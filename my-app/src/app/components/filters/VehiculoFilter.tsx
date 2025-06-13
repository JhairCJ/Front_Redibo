'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Props {
  search: string;
  setSearch: (value: string) => void;
  estadoFilter: string;
  setEstadoFilter: (value: string) => void;
  ordenamiento: string;
  setOrdenamiento: (value: string) => void;
}

const ordenOptions = [
  'Ordenar por nombre',
  'Ordenar por placa',
  'Ordenar por estado',
  'Más recientes',
  'Más antiguos',
];

const estadoOptions = [
  'Todos los estados',
  'En renta',
  'Disponible',
  'Reservado',
  'No disponible',
];

const VehiculoFilter: React.FC<Props> = ({
  search,
  setSearch,
  estadoFilter,
  setEstadoFilter,
  ordenamiento,
  setOrdenamiento,
}) => {
  const [dropdownEstadoOpen, setDropdownEstadoOpen] = useState(false);
  const [dropdownOrdenOpen, setDropdownOrdenOpen] = useState(false);
  
  const estadoDropdownRef = useRef<HTMLDivElement>(null);
  const ordenDropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (estadoDropdownRef.current && !estadoDropdownRef.current.contains(event.target as Node)) {
        setDropdownEstadoOpen(false);
      }
      if (ordenDropdownRef.current && !ordenDropdownRef.current.contains(event.target as Node)) {
        setDropdownOrdenOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar selección de estado
  const handleEstadoSelect = (estado: string) => {
    setEstadoFilter(estado);
    setDropdownEstadoOpen(false);
  };

  // Manejar selección de ordenamiento
  const handleOrdenSelect = (orden: string) => {
    setOrdenamiento(orden);
    setDropdownOrdenOpen(false);
  };

  // Toggle dropdown estado
  const toggleEstadoDropdown = () => {
    setDropdownEstadoOpen(!dropdownEstadoOpen);
    setDropdownOrdenOpen(false); // Cerrar el otro dropdown
  };

  // Toggle dropdown ordenamiento
  const toggleOrdenDropdown = () => {
    setDropdownOrdenOpen(!dropdownOrdenOpen);
    setDropdownEstadoOpen(false); // Cerrar el otro dropdown
  };

  return (
    <div className="w-full mb-6">
      {/* Versión Desktop */}
      <div className="hidden lg:flex lg:items-center lg:justify-between gap-4">
        {/* Barra de búsqueda */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar por nombre o placa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Filtros */}
        <div className="flex gap-3">
          {/* Dropdown Estado */}
          <div className="relative" ref={estadoDropdownRef}>
            <button
              type="button"
              onClick={toggleEstadoDropdown}
              className="bg-[#FFA726] hover:bg-[#FF9800] text-white px-4 py-2 rounded-lg flex items-center justify-between min-w-[180px] transition-colors duration-200"
            >
              <span className="truncate">{estadoFilter}</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  dropdownEstadoOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownEstadoOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {estadoOptions.map((estado) => (
                  <button
                    key={estado}
                    type="button"
                    onClick={() => handleEstadoSelect(estado)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                      estado === estadoFilter
                        ? 'bg-[#FFA726] text-white hover:bg-[#FF9800]'
                        : 'text-gray-700'
                    }`}
                  >
                    {estado}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Ordenamiento */}
          <div className="relative" ref={ordenDropdownRef}>
            <button
              type="button"
              onClick={toggleOrdenDropdown}
              className="bg-[#FFA726] hover:bg-[#FF9800] text-white px-4 py-2 rounded-lg flex items-center justify-between min-w-[180px] transition-colors duration-200"
            >
              <span className="truncate">{ordenamiento}</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  dropdownOrdenOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOrdenOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {ordenOptions.map((orden) => (
                  <button
                    key={orden}
                    type="button"
                    onClick={() => handleOrdenSelect(orden)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                      orden === ordenamiento
                        ? 'bg-[#FFA726] text-white hover:bg-[#FF9800]'
                        : 'text-gray-700'
                    }`}
                  >
                    {orden}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Versión Mobile/Tablet */}
      <div className="lg:hidden space-y-4">
        {/* Barra de búsqueda */}
        <div>
          <input
            type="text"
            placeholder="Buscar por nombre o placa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA726] focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Filtros en fila */}
        <div className="flex gap-3">
          {/* Dropdown Estado */}
          <div className="relative flex-1" ref={estadoDropdownRef}>
            <button
              type="button"
              onClick={toggleEstadoDropdown}
              className="w-full bg-[#FFA726] hover:bg-[#FF9800] text-white px-3 py-2 rounded-lg flex items-center justify-between text-sm transition-colors duration-200"
            >
              <span className="truncate">{estadoFilter}</span>
              <svg
                className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-200 ${
                  dropdownEstadoOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownEstadoOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {estadoOptions.map((estado) => (
                  <button
                    key={estado}
                    type="button"
                    onClick={() => handleEstadoSelect(estado)}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                      estado === estadoFilter
                        ? 'bg-[#FFA726] text-white hover:bg-[#FF9800]'
                        : 'text-gray-700'
                    }`}
                  >
                    {estado}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Ordenamiento */}
          <div className="relative flex-1" ref={ordenDropdownRef}>
            <button
              type="button"
              onClick={toggleOrdenDropdown}
              className="w-full bg-[#FFA726] hover:bg-[#FF9800] text-white px-3 py-2 rounded-lg flex items-center justify-between text-sm transition-colors duration-200"
            >
              <span className="truncate">{ordenamiento}</span>
              <svg
                className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-200 ${
                  dropdownOrdenOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOrdenOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {ordenOptions.map((orden) => (
                  <button
                    key={orden}
                    type="button"
                    onClick={() => handleOrdenSelect(orden)}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                      orden === ordenamiento
                        ? 'bg-[#FFA726] text-white hover:bg-[#FF9800]'
                        : 'text-gray-700'
                    }`}
                  >
                    {orden}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiculoFilter;