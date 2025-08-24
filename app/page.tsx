'use client';

import { Header } from "@/components/header"
import { HeroSection } from "@/components/home/hero-section"
import { EventsSlideshow } from "@/components/home/events-slideshow"
import { StatsCards } from "@/components/home/stats-cards"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function InvestorPlatform() {
  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-br from-cyan-100 via-white to-orange-100 min-h-screen">
        <Header currentPage="dashboard" />

        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <HeroSection />
          <StatsCards />
        </div>

        <EventsSlideshow />
      </div>
    </ProtectedRoute>
  )
}
