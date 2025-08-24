export interface FlightDetails {
  route: string;
  date: string;
  departure: {
    time: string;
    airport: string;
    terminal?: string;
  };
  arrival: {
    time: string;
    airport: string;
    terminal?: string;
  };
  duration: string;
  flightNumber: string;
  airline: string;
  aircraft: string;
}

export interface AccommodationDetails {
  checkIn: string;
  checkOut: string;
  nights: number;
  notes?: string;
}

export interface GroundTravelDetails {
  asayaSands: 'Attending' | 'Not Attending';
  arrangedBy: string;
  notes?: string;
}

export interface InvestorDetails {
  id: string;
  vcName: string;
  roleAtDA: string;
  city: string;
  fareType: 'Economy class' | 'Business class' | 'First class';
  arrivalFlight: FlightDetails;
  arrivalDate: string;
  departureDate: string;
  departureFlight: FlightDetails;
  accommodation: AccommodationDetails;
  groundTravel: GroundTravelDetails;
}

export const investorDetails: InvestorDetails[] = [
  {
    id: '1',
    vcName: 'James Tan',
    roleAtDA: 'Panel Speaker',
    city: 'Singapore',
    fareType: 'Economy class',
    arrivalFlight: {
      route: 'Singapore → Colombo',
      date: 'Wednesday, 17 September 2025',
      departure: {
        time: '09:45 am',
        airport: 'Changi Airport (SIN)',
        terminal: 'Terminal 3'
      },
      arrival: {
        time: '11:05am',
        airport: 'Bandaranaike International Airport (CMB)'
      },
      duration: '3 hours 50 minutes',
      flightNumber: 'UL 307',
      airline: 'Sri Lankan Airlines',
      aircraft: 'Airbus A320'
    },
    arrivalDate: '17th September',
    departureDate: '21st September',
    departureFlight: {
      route: 'Colombo (CMB) → Singapore (SIN)',
      date: '21st September 2025',
      departure: {
        time: '12:15 PM',
        airport: 'Bandaranaike International Airport'
      },
      arrival: {
        time: '18:55 PM',
        airport: 'Changi Airport',
        terminal: 'Terminal 3'
      },
      duration: '4h 10min',
      flightNumber: 'UL 308',
      airline: 'Sri Lankan Airlines',
      aircraft: 'Airbus A330-200'
    },
    accommodation: {
      checkIn: '17th September',
      checkOut: '19th September',
      nights: 3,
      notes: 'Check with Sachi if we give till 20th'
    },
    groundTravel: {
      asayaSands: 'Attending',
      arrangedBy: 'nVentures'
    }
  },
  {
    id: '2',
    vcName: 'Sarah Chen',
    roleAtDA: 'Keynote Speaker',
    city: 'Hong Kong',
    fareType: 'Business class',
    arrivalFlight: {
      route: 'Hong Kong → Colombo',
      date: 'Tuesday, 16 September 2025',
      departure: {
        time: '08:30 am',
        airport: 'Hong Kong International Airport (HKG)',
        terminal: 'Terminal 1'
      },
      arrival: {
        time: '11:45 am',
        airport: 'Bandaranaike International Airport (CMB)'
      },
      duration: '4 hours 15 minutes',
      flightNumber: 'CX 701',
      airline: 'Cathay Pacific',
      aircraft: 'Airbus A350-900'
    },
    arrivalDate: '16th September',
    departureDate: '22nd September',
    departureFlight: {
      route: 'Colombo (CMB) → Hong Kong (HKG)',
      date: '22nd September 2025',
      departure: {
        time: '14:20 PM',
        airport: 'Bandaranaike International Airport'
      },
      arrival: {
        time: '22:35 PM',
        airport: 'Hong Kong International Airport',
        terminal: 'Terminal 1'
      },
      duration: '5h 15min',
      flightNumber: 'CX 702',
      airline: 'Cathay Pacific',
      aircraft: 'Airbus A350-900'
    },
    accommodation: {
      checkIn: '16th September',
      checkOut: '21st September',
      nights: 5,
      notes: 'Extended stay for additional meetings'
    },
    groundTravel: {
      asayaSands: 'Attending',
      arrangedBy: 'nVentures'
    }
  },
  {
    id: '3',
    vcName: 'Michael Johnson',
    roleAtDA: 'Workshop Facilitator',
    city: 'Mumbai',
    fareType: 'Economy class',
    arrivalFlight: {
      route: 'Mumbai → Colombo',
      date: 'Wednesday, 17 September 2025',
      departure: {
        time: '06:15 am',
        airport: 'Chhatrapati Shivaji International Airport (BOM)',
        terminal: 'Terminal 2'
      },
      arrival: {
        time: '08:30 am',
        airport: 'Bandaranaike International Airport (CMB)'
      },
      duration: '2 hours 15 minutes',
      flightNumber: 'AI 275',
      airline: 'Air India',
      aircraft: 'Boeing 787-8'
    },
    arrivalDate: '17th September',
    departureDate: '20th September',
    departureFlight: {
      route: 'Colombo (CMB) → Mumbai (BOM)',
      date: '20th September 2025',
      departure: {
        time: '16:45 PM',
        airport: 'Bandaranaike International Airport'
      },
      arrival: {
        time: '19:00 PM',
        airport: 'Chhatrapati Shivaji International Airport',
        terminal: 'Terminal 2'
      },
      duration: '2h 15min',
      flightNumber: 'AI 276',
      airline: 'Air India',
      aircraft: 'Boeing 787-8'
    },
    accommodation: {
      checkIn: '17th September',
      checkOut: '20th September',
      nights: 3,
      notes: 'Standard accommodation package'
    },
    groundTravel: {
      asayaSands: 'Not Attending',
      arrangedBy: 'nVentures',
      notes: 'Direct transfer to airport on departure'
    }
  }
];

export const getInvestorById = (id: string): InvestorDetails | undefined => {
  return investorDetails.find(investor => investor.id === id);
};

export const getInvestorsByCity = (city: string): InvestorDetails[] => {
  return investorDetails.filter(investor => 
    investor.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const getInvestorsByRole = (role: string): InvestorDetails[] => {
  return investorDetails.filter(investor => 
    investor.roleAtDA.toLowerCase().includes(role.toLowerCase())
  );
};
