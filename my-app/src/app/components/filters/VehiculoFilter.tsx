'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Props {
  search: string;
  setSearch: (value: string) => void;
  estadoFilter: string; // Nuevo prop
  setEstadoFilter?: (value: string) => void;
  ordenamiento: string; // Nuevo prop  
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
  estadoFilter, // Usar el valor del padre
  setEstadoFilter,
  ordenamiento, // Usar el valor del padre
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

  return (
    <div className="w-full relative z-10 mb-6">
      {/* para pantallas grandes */}
      <div className="hidden md:flex md:items-center md:justify-between gap-4 w-full">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre o placa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#FFA726] focus:border-transparent"
          />
          <div className="relative w-56" ref={estadoRef}>
            <button
              onClick={toggleEstado}
              className="bg-[#FFA726] text-white px-4 py-2 border border-[#FFA726] rounded-md w-full flex justify-between items-center hover:bg-[#FF9800] transition-colors"
              aria-haspopup="listbox"
              aria-expanded={showEstado}
            >
              {estadoFilter} <span className="ml-2 text-black">▼</span>
            </button>
            {showEstado && (
              <ul className="absolute top-full mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-20" role="listbox">
                {estadoOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleEstadoSelect(option)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
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

        <div className="relative w-56" ref={ordenRef}>
          <button
            onClick={toggleOrden}
            className="bg-[#FFA726] text-white px-4 py-2 border border-[#FFA726] rounded-md w-full flex justify-between items-center hover:bg-[#FF9800] transition-colors"
            aria-haspopup="listbox"
            aria-expanded={showOrden}
          >
            {ordenamiento} <span className="ml-2 text-black">▼</span>
          </button>
          {showOrden && (
            <ul className="absolute top-full mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-20" role="listbox">
              {ordenOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => handleOrdenSelect(option)}
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

      {/* para móviles */}
      <div className="flex flex-col gap-4 md:hidden">
        <input
          type="text"
          placeholder="Buscar por nombre o placa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FFA726] focus:border-transparent"
        />

        <div className="flex gap-2">
          <div className="relative flex-1" ref={estadoRef}>
            <button
              onClick={toggleEstado}
              className="bg-[#FFA726] text-white px-3 py-2 border border-[#FFA726] rounded-md w-full flex justify-between items-center text-sm hover:bg-[#FF9800] transition-colors"
              aria-haspopup="listbox"
              aria-expanded={showEstado}
            >
              <span className="truncate">{estadoFilter}</span>
              <span className="ml-2 text-black flex-shrink-0">▼</span>
            </button>
            {showEstado && (
              <ul
                className="absolute top-full mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-20 max-h-48 overflow-y-auto"
                role="listbox"
                tabIndex={-1}
              >
                {estadoOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleEstadoSelect(option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleEstadoSelect(option);
                      }
                    }}
                    role="option"
                    aria-selected={option === estadoFilter}
                    tabIndex={0}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm ${
                      option === estadoFilter ? 'bg-[#FFA726] text-white' : 'text-black'
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
                className="absolute top-full mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-20 max-h-48 overflow-y-auto"
                role="listbox"
                tabIndex={-1}
              >
                {ordenOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleOrdenSelect(option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleOrdenSelect(option);
                      }
                    }}
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