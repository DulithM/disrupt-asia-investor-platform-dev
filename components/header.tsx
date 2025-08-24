"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Menu, X, Bookmark, CalendarIcon, LogOut, User, Building2, Shield, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useFavorites } from "@/hooks/use-favorites"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
  currentPage?: string
}

export function Header({ currentPage = "dashboard" }: HeaderProps) {
  const { favorites } = useFavorites()
  const { user, logout, isAuthenticated } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3" onClick={closeMobileMenu}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                <Image
                  src="/logos/logo-01.png"
                  alt="Disrupt Asia Logo"
                  width={56}
                  height={56}
                  className="object-contain scale-125"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Disrupt <span className="text-red-600">Asia</span> 2025
                </h1>
                <p className="text-xs sm:text-sm font-bold text-cyan-600">Investor Platform</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900">
                  Disrupt <span className="text-red-600">Asia</span>
                </h1>
                <p className="text-xs font-bold text-cyan-600">2025</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/startups"
              className={`font-medium ${
                currentPage === "startups"
                  ? "text-cyan-600 border-b-2 border-cyan-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Startups
            </Link>
            <Link 
              href="/map" 
              className={`font-medium ${
                currentPage === "map"
                  ? "text-cyan-600 border-b-2 border-cyan-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Map
            </Link>
            <Link
              href="/floor-plan"
              className={`font-medium ${
                currentPage === "floor-plan"
                  ? "text-cyan-600 border-b-2 border-cyan-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Floor Plan
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/favorites">
              <Button variant="outline" className="relative">
                <Bookmark className="h-4 w-4 mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/personal-schedule">
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Personal Schedule
              </Button>
            </Link>
            
            {/* User Menu */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                                              <div className="flex items-center space-x-1 mt-1">
                          <Building2 className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground capitalize">
                            {user.role}
                          </span>
                        </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link
                href="/startups"
                className={`font-medium py-2 px-4 rounded-lg transition-colors ${
                  currentPage === "startups"
                    ? "text-cyan-600 bg-cyan-50 border-l-4 border-cyan-500"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={closeMobileMenu}
              >
                Startups
              </Link>
              <Link 
                href="/map" 
                className={`font-medium py-2 px-4 rounded-lg transition-colors ${
                  currentPage === "map"
                    ? "text-cyan-600 bg-cyan-50 border-l-4 border-cyan-500"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={closeMobileMenu}
              >
                Map
              </Link>
              <Link
                href="/floor-plan"
                className={`font-medium py-2 px-4 rounded-lg transition-colors ${
                  currentPage === "floor-plan"
                    ? "text-cyan-600 bg-cyan-50 border-l-4 border-cyan-500"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={closeMobileMenu}
              >
                Floor Plan
              </Link>
              <div className="pt-2">
                <Link href="/favorites" onClick={closeMobileMenu}>
                  <Button 
                    variant="outline"
                    className="w-full relative"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Favorites
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
              <div className="pt-2">
                <Link href="/personal-schedule" onClick={closeMobileMenu}>
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Personal Schedule
                  </Button>
                </Link>
              </div>
              
              {/* Mobile User Menu */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Building2 className="h-3 w-3" />
                          <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => { logout(); closeMobileMenu(); }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" onClick={closeMobileMenu}>
                    <Button variant="outline" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
