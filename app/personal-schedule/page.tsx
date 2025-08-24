'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { getInvestorById } from '@/data/investor-details';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Target, CheckCircle, MapPin, Building2, TrendingUp, DollarSign, Star, Plane, Hotel, Car, CalendarDays } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function PersonalSchedulePage() {
  return (
    <ProtectedRoute requiredRole="investor">
      <PersonalScheduleContent />
    </ProtectedRoute>
  );
}

function PersonalScheduleContent() {
  const { user } = useAuth();
  const investor = user ? getInvestorById(user.id) : null;

  if (!investor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-orange-100">
        <Header currentPage="personal-schedule" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Investor Profile Not Found</h1>
            <p className="text-gray-600">Unable to load your investor profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-orange-100">
      <Header currentPage="personal-schedule" />

      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-2 sm:p-3 rounded-full mb-3 sm:mb-0 sm:mr-4 shadow-lg">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Your Personal Schedule
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2 sm:px-0">
              Your personalized 4-day agenda for Disrupt Asia 2025. Discover how to maximize your time and connections at the event.
            </p>
          </div>
        </div>
      </div>

      {/* Investor Profile Summary */}
      <div className="container mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-semibold">
                    {investor.vcName.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{investor.vcName}</h3>
                  <p className="text-sm text-gray-600">{investor.roleAtDA}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{investor.city}</span>
                <Badge variant="secondary" className="ml-2">
                  <Building2 className="h-3 w-3 mr-1" />
                  {investor.fareType.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
                <span>{investor.arrivalDate} - {investor.departureDate}</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Hotel className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
                <span>{investor.accommodation.nights} nights</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Plane className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                <span>{investor.arrivalFlight.airline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Travel Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Plane className="h-5 w-5 mr-2 text-cyan-600" />
                Flight Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Airline:</span>
                  <span className="font-semibold text-gray-900">{investor.arrivalFlight.airline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Class:</span>
                  <span className="font-semibold text-gray-900">{investor.fareType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-900">{investor.arrivalFlight.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Hotel className="h-5 w-5 mr-2 text-teal-600" />
                Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Check-in:</span>
                  <span className="font-semibold text-gray-900">{investor.accommodation.checkIn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Check-out:</span>
                  <span className="font-semibold text-gray-900">{investor.accommodation.checkOut}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nights:</span>
                  <span className="font-semibold text-gray-900">{investor.accommodation.nights}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Car className="h-5 w-5 mr-2 text-orange-600" />
                Ground Travel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Asaya Sands:</span>
                  <Badge variant={investor.groundTravel.asayaSands === 'Attending' ? 'default' : 'secondary'} className="text-xs">
                    {investor.groundTravel.asayaSands}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Arranged by:</span>
                  <span className="font-semibold text-gray-900">{investor.groundTravel.arrangedBy}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flight Details */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Flight Information</h2>
            <p className="text-base sm:text-lg text-gray-600">Your complete travel itinerary for Disrupt Asia 2025</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Arrival Flight */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">Arrival Flight</CardTitle>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                    {investor.arrivalFlight.date}
                  </Badge>
                </div>
                <CardDescription className="text-white/90 text-base font-medium">
                  {investor.arrivalFlight.route}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Departure</h4>
                      <p className="text-sm text-gray-600">{investor.arrivalFlight.departure.time}</p>
                      <p className="text-sm text-gray-600">{investor.arrivalFlight.departure.airport}</p>
                      {investor.arrivalFlight.departure.terminal && (
                        <p className="text-sm text-gray-600">Terminal {investor.arrivalFlight.departure.terminal}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Arrival</h4>
                      <p className="text-sm text-gray-600">{investor.arrivalFlight.arrival.time}</p>
                      <p className="text-sm text-gray-600">{investor.arrivalFlight.arrival.airport}</p>
                      {investor.arrivalFlight.arrival.terminal && (
                        <p className="text-sm text-gray-600">Terminal {investor.arrivalFlight.arrival.terminal}</p>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Flight:</span>
                      <p className="font-semibold">{investor.arrivalFlight.flightNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <p className="font-semibold">{investor.arrivalFlight.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Airline:</span>
                      <p className="font-semibold">{investor.arrivalFlight.airline}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Aircraft:</span>
                      <p className="font-semibold">{investor.arrivalFlight.aircraft}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Departure Flight */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">Departure Flight</CardTitle>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                    {investor.departureFlight.date}
                  </Badge>
                </div>
                <CardDescription className="text-white/90 text-base font-medium">
                  {investor.departureFlight.route}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Departure</h4>
                      <p className="text-sm text-gray-600">{investor.departureFlight.departure.time}</p>
                      <p className="text-sm text-gray-600">{investor.departureFlight.departure.airport}</p>
                      {investor.departureFlight.departure.terminal && (
                        <p className="text-sm text-gray-600">Terminal {investor.departureFlight.departure.terminal}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Arrival</h4>
                      <p className="text-sm text-gray-600">{investor.departureFlight.arrival.time}</p>
                      <p className="text-sm text-gray-600">{investor.departureFlight.arrival.airport}</p>
                      {investor.departureFlight.arrival.terminal && (
                        <p className="text-sm text-gray-600">Terminal {investor.departureFlight.arrival.terminal}</p>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Flight:</span>
                      <p className="font-semibold">{investor.departureFlight.flightNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <p className="font-semibold">{investor.departureFlight.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Airline:</span>
                      <p className="font-semibold">{investor.departureFlight.airline}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Aircraft:</span>
                      <p className="font-semibold">{investor.departureFlight.aircraft}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-cyan-600" />
                Stay Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Arrival Date:</span>
                  <span className="font-semibold text-gray-900">{investor.arrivalDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Departure Date:</span>
                  <span className="font-semibold text-gray-900">{investor.departureDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Nights:</span>
                  <span className="font-semibold text-gray-900">{investor.accommodation.nights}</span>
                </div>
                {investor.accommodation.notes && (
                  <div className="pt-2 border-t">
                    <span className="text-sm text-gray-600">Notes:</span>
                    <p className="text-sm text-gray-700 mt-1">{investor.accommodation.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-5 w-5 mr-2 text-teal-600" />
                Ground Travel Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Asaya Sands:</span>
                  <Badge variant={investor.groundTravel.asayaSands === 'Attending' ? 'default' : 'secondary'}>
                    {investor.groundTravel.asayaSands}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Arranged by:</span>
                  <span className="font-semibold text-gray-900">{investor.groundTravel.arrangedBy}</span>
                </div>
                {investor.groundTravel.notes && (
                  <div className="pt-2 border-t">
                    <span className="text-sm text-gray-600">Notes:</span>
                    <p className="text-sm text-gray-700 mt-1">{investor.groundTravel.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
