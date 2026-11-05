export interface CostBreakdown {
  travelCost: number;
  accommodationCost: number;
  foodCost: number;
  localTransportCost: number;
  activityCost: number;
  totalEstimatedCost: number;
}

export interface Attraction {
  name: string;
  description: string;
  type: 'monument' | 'spiritual' | 'nature' | 'museum' | 'culinary';
  timing?: string;
  entryFee?: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  region: string;
  district: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  heroImage: string;
  galleryImages: string[];
  description: string;
  history: string;
  significance: string;
  whyVisit: string;
  category: 'historical' | 'nature' | 'spiritual' | 'food' | 'culture' | 'photography' | 'weekend';
  bestTimeToVisit: string;
  recommendedDuration: string;
  distanceFromDelhiKm: number;
  distanceFromChandigarhKm: number;
  famousAttractions: Attraction[];
  hiddenGems: {
    name: string;
    description: string;
    locationNote: string;
  }[];
  localDelicacies: {
    name: string;
    description: string;
    mustTryAt?: string;
  }[];
  travelTips: string[];
  estimatedDailyBudgetPerPerson: CostBreakdown;
  scenes?: FilmScene[];
}

export interface FilmScene {
  sceneNumber: number;
  title: string;
  subtitle: string;
  narration: string;
  visualDescription: string;
  image: string;
  highlightPoints: string[];
  estimatedDurationSeconds: number;
}

export interface FilmScript {
  title: string;
  tagline: string;
  destinationName: string;
  scenes: FilmScene[];
}

export interface BudgetRecommendation {
  destinationId: string;
  destinationName: string;
  stateRegion: string;
  heroImage: string;
  description: string;
  whyItMatches: string;
  distanceKm: number;
  costBreakdown: CostBreakdown;
  suggestedDays: number;
  budgetCategory: 'Economical' | 'Balanced' | 'Premium';
  travelTip: string;
}

export interface LocalGuide {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  reviewsCount: number;
  yearsExperience: number;
  languages: string[];
  expertise: string[];
  bio: string;
  dailyRateINR: number;
  halfDayRateINR: number;
  availability: 'Available Today' | 'Accepting Bookings' | 'Weekends Only';
  verifiedDemo: boolean;
}

export interface GroupExperience {
  id: string;
  title: string;
  destination: string;
  destinationId: string;
  image: string;
  date: string;
  time: string;
  duration: string;
  organizer: {
    name: string;
    title: string;
    badge: string;
  };
  groupSizeLimit: number;
  currentBooked: number;
  pricePerPersonINR: number;
  category: 'Heritage Walk' | 'Historical Tour' | 'Nature & Trek' | 'Photography Walk' | 'Cultural Immersion';
  meetingPoint: string;
  highlights: string[];
  includes: string[];
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  morning: { time: string; activity: string; place: string; estExpense: number };
  lunch: { place: string; foodItem: string; estExpense: number };
  afternoon: { time: string; activity: string; place: string; estExpense: number };
  evening: { time: string; activity: string; place: string; estExpense: number };
  dinner: { place: string; foodItem: string; estExpense: number };
}
