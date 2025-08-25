"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

interface MobileNavProps {
  currentPage?: string
  onClose?: () => void
}

export function MobileNav({ currentPage = "dashboard", onClose }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  const navigationItems = [
    { href: "/startups", label: "Startups" },
    { href: "/favorites", label: "Favorites" },
    { href: "/map", label: "Map" },
  ]

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="p-2"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={handleClose}>
          <div 
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="p-1"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      currentPage === item.label.toLowerCase()
                        ? "text-cyan-600 bg-cyan-50 border-l-4 border-cyan-500"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={handleClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              

            </nav>
          </div>
        </div>
      )}
    </div>
  )
} 