"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"

const eventImages = [
  "/events/DA-2016-22.jpg",
  "/events/DA-2016-24.jpg",
  "/events/DA-2016-25.jpg",
  "/events/DA-2016-28.jpg",
  "/events/DA-2016-7.jpg",
  "/events/DA-2017-16.jpg",
  "/events/DA-2017-19.jpg",
  "/events/DA-2018-17.jpg",
  "/events/DA-2019-9.jpg",
  "/events/DA-2019-29.jpg",
]

const eventYears = [
  "2016",
  "2016",
  "2016",
  "2016",
  "2016",
  "2017",
  "2017",
  "2018",
  "2019",
  "2019",
]

export function EventsSlideshow() {
  return (
    <div className="relative mb-6 sm:mb-8 lg:mb-12 overflow-hidden">
      <div className="flex animate-scroll">
        {/* First set of images */}
        {eventImages.map((image, index) => (
          <div key={`first-${index}`} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-1 sm:px-2">
            <div className="relative">
              <div className="aspect-[3/2] overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Disrupt Asia ${eventYears[index]} Event`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg" />
              <div className="absolute bottom-2 left-2 right-2">
                <Badge variant="secondary" className="mb-1 text-xs sm:text-sm">
                  {eventYears[index]}
                </Badge>
                <h3 className="text-white font-semibold text-xs sm:text-sm">
                  Disrupt Asia {eventYears[index]}
                </h3>
              </div>
            </div>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {eventImages.map((image, index) => (
          <div key={`second-${index}`} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-1 sm:px-2">
            <div className="relative">
              <div className="aspect-[3/2] overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Disrupt Asia ${eventYears[index]} Event`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg" />
              <div className="absolute bottom-2 left-2 right-2">
                <Badge variant="secondary" className="mb-1 text-xs sm:text-sm">
                  {eventYears[index]}
                </Badge>
                <h3 className="text-white font-semibold text-xs sm:text-sm">
                  Disrupt Asia {eventYears[index]}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 