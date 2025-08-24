"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText
} from "lucide-react"
import { LoadingScreen } from '@/components/ui/loading-screen';

interface PDFViewerModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  startupName: string
}

export function PDFViewerModal({ isOpen, onClose, pdfUrl, startupName }: PDFViewerModalProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setError(null)
      setCurrentPage(1)
      setScale(1)
      setRotation(0)
    }
  }, [isOpen, pdfUrl])

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as Element
        if (!target.closest('.pdf-modal-content')) {
          onClose()
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${startupName.replace(/\s+/g, '_')}_pitch_deck.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank')
  }

  return (
    <>
      {/* Backdrop to prevent background clicks */}
      {isOpen && (
        <div className="fixed inset-0 z-[9998] bg-transparent" />
      )}
      
      {/* Custom modal content */}
      {isOpen && (
        <div className="pdf-modal-content fixed left-1/2 top-[0.00001%] z-[9999] w-[98vw] sm:w-[95vw] max-w-7xl h-[100vh] sm:h-[98vh] -translate-x-1/2 bg-white rounded-none sm:rounded-lg shadow-2xl flex flex-col" style={{ pointerEvents: 'auto' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-cyan-200 px-3 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 flex-shrink-0 rounded-t-lg">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                  {startupName} - Pitch Deck
                </h2>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleOpenInNewTab}
                className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 text-xs sm:text-sm"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Open in New Tab</span>
                <span className="sm:hidden">Open</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownload}
                className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 text-xs sm:text-sm"
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">Save</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* PDF Viewer - takes remaining space */}
          <div className="flex-1 bg-gray-50 min-h-0 relative">
            {/* Mobile-friendly PDF viewer */}
            <div className="w-full h-full">
              <iframe
                src={pdfUrl}
                className="w-full h-full bg-white border-0"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setError("Failed to load PDF. Please try opening in a new tab.")
                  setIsLoading(false)
                }}
                title={`${startupName} Pitch Deck PDF`}
              />
            </div>
            
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-95">
                <LoadingScreen 
                  message="Loading PDF..." 
                  size="sm" 
                />
              </div>
            )}
            
            {/* Error state */}
            {error && (
              <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-red-600 mb-4">{error}</p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      variant="outline"
                      onClick={handleOpenInNewTab}
                      className="border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleDownload}
                      className="border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
