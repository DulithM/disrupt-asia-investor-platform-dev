"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react"

interface FilterState {
  search: string
  industry: string
  stage: string
  location: string
  quickFilters: string[]
}

interface StartupFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  totalResults: number
  sticky?: boolean
}

export function StartupFilters({ onFiltersChange, totalResults, sticky = true }: StartupFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    industry: "all",
    stage: "all",
    location: "all",
    quickFilters: []
  })
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      industry: "all",
      stage: "all",
      location: "all",
      quickFilters: []
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const toggleQuickFilter = (filter: string) => {
    const newQuickFilters = filters.quickFilters.includes(filter)
      ? filters.quickFilters.filter(f => f !== filter)
      : [...filters.quickFilters, filter]
    
    const newFilters = { ...filters, quickFilters: newQuickFilters }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  return (
    <div className={`${sticky ? 'lg:sticky lg:top-32' : ''} h-fit`}>
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-cyan-600" />
              Filters
            </CardTitle>
            <div className="flex items-center space-x-2">
              {/* Mobile Toggle Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-gray-700 p-1 sm:p-2 lg:hidden"
                onClick={() => setIsMobileExpanded(!isMobileExpanded)}
              >
                {isMobileExpanded ? (
                  <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={`space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6 ${isMobileExpanded ? 'block' : 'hidden lg:block'}`}>
          {/* Search */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <Input 
                placeholder="Search startups..." 
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          {/* Domain Filter */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Startup Domain</label>
            <Select value={filters.industry} onValueChange={(value) => handleFilterChange("industry", value)}>
              <SelectTrigger className="w-full text-xs sm:text-sm">
                <SelectValue placeholder="All Domains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="AgriTech">AgriTech</SelectItem>
                <SelectItem value="HealthTech">HealthTech</SelectItem>
                <SelectItem value="FinTech">FinTech</SelectItem>
                <SelectItem value="Enterprise SaaS">Enterprise SaaS</SelectItem>
                <SelectItem value="AI Agents">AI Agents</SelectItem>
                <SelectItem value="InsurTech">InsurTech</SelectItem>
                <SelectItem value="Enterprise Tech">Enterprise Tech</SelectItem>
                <SelectItem value="FoodTech">FoodTech</SelectItem>
                <SelectItem value="HR Tech">HR Tech</SelectItem>
                <SelectItem value="EdTech">EdTech</SelectItem>
                <SelectItem value="LogiTech">LogiTech</SelectItem>
                <SelectItem value="Adtech">Adtech</SelectItem>
                <SelectItem value="GovTech/CivicTech">GovTech/CivicTech</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Person Filter */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Contact Person</label>
            <Select value={filters.stage} onValueChange={(value) => handleFilterChange("stage", value)}>
              <SelectTrigger className="w-full text-xs sm:text-sm">
                <SelectValue placeholder="All Contacts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contacts</SelectItem>
                <SelectItem value="CEO">CEO</SelectItem>
                <SelectItem value="Founder">Founder</SelectItem>
                <SelectItem value="CTO">CTO</SelectItem>
                <SelectItem value="Co-Founder">Co-Founder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Filters */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Quick Filters</label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["Top 30", "Local", "Foreign"].map((filter) => (
                <Badge 
                  key={filter}
                  variant={filters.quickFilters.includes(filter) ? "default" : "secondary"}
                  className={`cursor-pointer text-xs ${
                    filters.quickFilters.includes(filter) 
                      ? "bg-cyan-600 hover:bg-cyan-700" 
                      : "hover:bg-cyan-100"
                  }`}
                  onClick={() => toggleQuickFilter(filter)}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 sm:pt-4">
            <Button 
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-xs sm:text-sm py-2 sm:py-2.5"
              onClick={() => onFiltersChange(filters)}
            >
              <SlidersHorizontal className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              className="w-full bg-transparent text-xs sm:text-sm py-2 sm:py-2.5"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
          </div>

          {/* Results Count */}
          <div className="pt-3 sm:pt-4 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              Showing <span className="font-semibold text-gray-900">{totalResults}</span> startups
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
