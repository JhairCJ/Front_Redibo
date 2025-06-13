'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Props {
  search: string;
  setSearch: (value: string) => void;
  estadoFilter: string;
  setEstadoFilter?: (value: string) => void;
  ordenamiento: string;
  setOrdenamiento?: (value: string) => void;
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

const VehiculoFilter = ({
  search,
  setSearch,
  estadoFilter,
  setEstadoFilter,
  ordenamiento,
  setOrdenamiento,
}: Props) => {
  const [showEstado, setShowEstado] = useState(false);
  const [showOrden, setShowOrden] = useState(false);

  const estadoRef = useRef<HTMLDivElement>(null);
  const ordenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (estadoRef.current && !estadoRef.current.contains(event.target as Node)) {
        setShowEstado(false);
      }
      if (ordenRef.current && !ordenRef.current.contains(event.target as Node)) {
        setShowOrden(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleEstado = () => {
    setShowEstado((prev) => !prev);
    setShowOrden(false);
  };

  const toggleOrden = () => {
    setShowOrden((prev) => !prev);
    setShowEstado(false);
  };

  const handleEstadoSelect = (value: string) => {
    setEstadoFilter?.(value);
    setShowEstado(false);
  };

  const handleOrdenSelect = (value: string) => {
    setOrdenamiento?.(value);
    setShowOrden(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, handler: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  };

  return (
    <div className="w-full mb-6">
      {/* Layout responsivo unificado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        {/* Input de búsqueda y filtros agrupados en mobile */}
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <input
            type="text"
            placeholder="Buscar por nombre o placa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#FFA726] focus:border-transparent"
          />
          
          {/* Filtros en una fila en mobile, separados en desktop */}
          <div className="flex gap-2 md:gap-4">
            {/* Filtro de Estado */}
            <div className="relative flex-1 md:w-56" ref={estadoRef}>
              <button
                onClick={toggleEstado}
                className="bg-[#FFA726] text-white px-3 md:px-4 py-2 border border-[#FFA726] rounded-md w-full flex justify-between items-center text-sm md:text-base hover:bg-[#FF9800] transition-colors"
                aria-haspopup="listbox"
                aria-expanded={showEstado}
              >
                <span className="truncate">{estadoFilter}</span>
                <span className="ml-2 text-black flex-shrink-0">▼</span>
              </button>
              {showEstado && (
                <ul
                  className="absolute top-full mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-50 max-h-48 overflow-y-auto"
                  role="listbox"
                >
                  {estadoOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleEstadoSelect(option)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleEstadoSelect(option))}
                      role="option"
                      aria-selected={option === estadoFilter}
                      tabIndex={0}
                      className={`px-3 md:px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm md:text-base ${
                        option === estadoFilter ? 'bg-[#FFA726] text-white' : 'text-black'
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Filtro de Ordenamiento - separado en desktop, junto con estado en mobile */}
        <div className="md:block hidden">
          <div className="relative w-56" ref={ordenRef}>
            <button
              onClick={toggleOrden}
              className="bg-[#FFA726] text-white px-4 py-2 border border-[#FFA726] rounded-md w-full flex justify-between items-center hover:bg-[#FF9800] transition-colors"
              aria-haspopup="listbox"
              aria-expanded={showOrden}
            >
              <span className="truncate">{ordenamiento}</span>
              <span className="ml-2 text-black flex-shrink-0">▼</span>
            </button>
            {showOrden && (
              <ul
                className="absolute top-full mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-50 max-h-48 overflow-y-auto"
                role="listbox"
              >
                {ordenOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleOrdenSelect(option)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleOrdenSelect(option))}
                    role="option"
                    aria-selected={option === ordenamiento}
                    tabIndex={0}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      option === ordenamiento ? 'bg-[#FFA726] text-white' : 'text-black'
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Filtro de Ordenamiento para mobile - en la misma fila que estado */}
        <div className="md:hidden">
          <div className="relative flex-1" ref={ordenRef}>
            <button
              onClick={toggleOrden}
              className="bg-[#FFA726] text-white px-3 py-2 border border-[#FFA726] rounded-md w-full flex justify-between items-center text-sm hover:bg-[#FF9800] transition-colors"
              aria-haspopup="listbox"
              aria-expanded={showOrden}
            >
              <span className="truncate">{ordenamiento}</span>
              <span className="ml-2 text-black flex-shrink-0">▼</span>
            </button>
            {showOrden && (
              <ul
                className="absolute top-full mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-50 max-h-48 overflow-y-auto"
                role="listbox"
              >
                {ordenOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleOrdenSelect(option)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleOrdenSelect(option))}
                    role="option"
                    aria-selected={option === ordenamiento}
                    tabIndex={0}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm ${
                      option === ordenamiento ? 'bg-[#FFA726] text-white' : 'text-black'
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiculoFilter;