'use client'

import { useState, useRef } from 'react'
import { FiDownload, FiX } from 'react-icons/fi'

interface PaymentDetails {
  monto: number;
  moneda: string;
  fechaPago: string;
  metodoPago: string;
  ultimosDigitos: string;
  cliente: string;
  fechaLiberacion: string;
  isGarantia?: boolean;
}

interface ComprobanteDePagoProps {
  isOpen: boolean;
  onClose: () => void;
  paymentDetails: PaymentDetails;
  onAccept: () => void;
}

export default function ComprobanteDePago({
  isOpen,
  onClose,
  paymentDetails,
  onAccept
}: ComprobanteDePagoProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const comprobateRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  if (!isOpen) {
    return null
  }

  const handleDownload = () => {
    setIsDownloading(true)
    
    try {
      // Mensaje temporal mientras se implementa la funcionalidad de descarga
      console.log('Funcionalidad de descarga temporalmente deshabilitada')
      alert('La funcionalidad de descarga estará disponible pronto')
      
      // Aquí iría el código para generar y descargar el PDF
      // cuando las dependencias estén correctamente instaladas
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Contenido que se capturará para el PDF */}
        <div ref={comprobateRef} className="bg-white rounded-lg p-2">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#002D62]">
              Comprobante de Pago
            </h2>
            <div className="flex items-center gap-2">
              {paymentDetails.isGarantia && (
                <span className="bg-[#FFF8E1] text-[#FFA000] px-3 py-1 rounded-full text-sm font-medium">
                  Garantía
                </span>
              )}
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Monto</span>
                <span className="font-semibold text-gray-800">{paymentDetails.monto.toFixed(2)} {paymentDetails.moneda}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Fecha de Pago</span>
                <span className="font-medium">{paymentDetails.fechaPago}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Método de Pago</span>
                <span className="font-medium">{paymentDetails.metodoPago} •••• {paymentDetails.ultimosDigitos}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Cliente</span>
                <span className="font-medium">{paymentDetails.cliente}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Fecha de Liberación</span>
                <span className="font-medium">{paymentDetails.fechaLiberacion}</span>
              </div>
            </div>
            
            {paymentDetails.isGarantia && (
              <div className="bg-[#FFF8E1] p-4 rounded-lg border border-[#FFE082] mt-4">
                <p className="text-sm text-gray-700">
                  La garantía será liberada automáticamente al finalizar el periodo de renta, siempre y cuando no existan cargos adicionales.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Botones de acción que no se incluirán en el PDF */}
        <div ref={buttonsRef} className="px-6 pb-6">
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex-1 px-4 py-3 bg-[#F7F7F7] hover:bg-gray-200 text-gray-800 rounded-md font-medium flex items-center justify-center gap-2 ${
                isDownloading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <FiDownload className="text-lg" />
              {isDownloading ? 'Descargando...' : 'Descargar'}
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-4 py-3 bg-[#FFA500] hover:bg-[#e69500] text-white rounded-md font-medium"
            >
              Aceptar
            </button>
          </div>
        </div>
        
        {/* Botón para cerrar el modal */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Cerrar modal"
        >
          <FiX className="text-gray-500 text-lg" />
        </button>
      </div>
    </div>
  )
}