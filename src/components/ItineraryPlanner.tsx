import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Utensils,
  DollarSign,
  Sparkles,
  Layers,
  ChevronRight,
  Info,
  Navigation,
} from 'lucide-react';
import L from 'leaflet';
import { DESTINATIONS, CURATED_ITINERARIES } from '../data/destinations';
import { ItineraryDay } from '../types/travel';

interface ItineraryPlannerProps {
  initialDestinationId?: string;
  onOpenFilmPlayer: (destId: string) => void;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({
  initialDestinationId = 'kurukshetra',
  onOpenFilmPlayer,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(initialDestinationId);
  const [totalDays, setTotalDays] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<string>('Heritage & Culture');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const selectedDestination =
    DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  // Load Itinerary for destination
  useEffect(() => {
    setIsGenerating(true);
    const curated = CURATED_ITINERARIES[selectedDestId] || CURATED_ITINERARIES.kurukshetra;

    // Simulate smart dynamic generation
    setTimeout(() => {
      // Adjust days based on selected days
      if (totalDays === 1) {
        setItineraryDays([curated[0]]);
      } else if (totalDays === 2) {
        setItineraryDays(curated.slice(0, 2));
      } else {
        // 3 days: extend day 3
        const day3: ItineraryDay = {
          dayNumber: 3,
          title: 'Hidden Trails, Folk Crafts & Local Homestays',
          morning: {
            time: '08:00 AM - 11:30 AM',
            place: `${selectedDestination.name} Rural Craft Cluster`,
            activity: 'Witness traditional clay potters, weaving looms, and converse with village elders.',
            estExpense: 200,
          },
          lunch: {
            place: 'Village Baithak Dhabha',
            foodItem: 'Tandoori Roti with fresh homemade white butter & Saag',
            estExpense: 300,
          },
          afternoon: {
            time: '01:30 PM - 04:30 PM',
            place: selectedDestination.hiddenGems[0]?.name || 'Quiet Heritage Grove',
            activity: 'Contemplative stroll through historic stepwells and lesser-known ASI mounds.',
            estExpense: 150,
          },
          evening: {
            time: '05:00 PM - 07:30 PM',
            place: 'Scenic Sunset Vantage Point',
            activity: 'Relaxing twilight tea and local folk music session with community storytellers.',
            estExpense: 200,
          },
          dinner: {
            place: 'Grand Highway Dhaba',
            foodItem: 'Dal Tadka, Shahi Paneer, and hot Gulab Jamuns',
            estExpense: 450,
          },
        };
        setItineraryDays([...curated.slice(0, 2), day3]);
      }
      setIsGenerating(false);
      setActiveDayIndex(0);
    }, 400);
  }, [selectedDestId, totalDays, travelStyle]);

  // Initialize or update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: selectedDestination.coordinates,
        zoom: 13,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(selectedDestination.coordinates, 13);
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Custom Map Marker styling with Leaflet DivIcon
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="background-color: #0B192C; color: #D4AF37; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid #ffffff;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add main marker
    const mainMarker = L.marker(selectedDestination.coordinates, { icon: customIcon }).addTo(map);
    mainMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px;">
        <strong style="color: #0B192C; font-size: 14px;">${selectedDestination.name}</strong>
        <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748b;">${selectedDestination.tagline}</p>
      </div>
    `);
    markersRef.current.push(mainMarker);

    // Add markers for famous attractions nearby
    selectedDestination.famousAttractions.forEach((att, idx) => {
      // Offset slightly for demonstration of visual circuit
      const latOffset = (idx + 1) * 0.008 * (idx % 2 === 0 ? 1 : -1);
      const lngOffset = (idx + 1) * 0.009 * (idx % 3 === 0 ? -1 : 1);
      const pos: [number, number] = [
        selectedDestination.coordinates[0] + latOffset,
        selectedDestination.coordinates[1] + lngOffset,
      ];

      const attIcon = L.divIcon({
        className: 'custom-sub-marker',
        html: `
          <div style="background-color: #1B4332; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
            ${idx + 1}
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(pos, { icon: attIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <strong style="color: #1B4332; font-size: 13px;">${att.name}</strong>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #475569;">${att.description}</p>
        </div>
      `);
      markersRef.current.push(marker);
    });

    return () => {
      // Map stays attached to container ref
    };
  }, [selectedDestination]);

  const currentDay = itineraryDays[activeDayIndex] || itineraryDays[0];

  const totalDayExpenses = currentDay
    ? currentDay.morning.estExpense +
      currentDay.lunch.estExpense +
      currentDay.afternoon.estExpense +
      currentDay.evening.estExpense +
      currentDay.dinner.estExpense
    : 1500;

  return (
    <section id="itinerary-planner" className="py-12 lg:py-16 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1B4332]">
            <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Smart Itinerary Planner</span>
            <span aria-hidden="true">·</span>
            <span>Optimized Daily Routes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0B192C] tracking-tight">
            Craft Your Perfect Day-by-Day Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Logical visit sequences, authentic regional meals, realistic timings, and interactive geographical routing powered by OpenStreetMap.
          </p>
        </div>

        {/* Control Bar: Destination, Days & Style */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Destination
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm bg-[#fcfaf7] border border-stone-300 rounded-xl font-medium"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.district})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Total Days
              </label>
              <select
                value={totalDays}
                onChange={(e) => setTotalDays(Number(e.target.value))}
                className="w-full p-2.5 text-xs sm:text-sm bg-[#fcfaf7] border border-stone-300 rounded-xl font-medium"
              >
                <option value={1}>1 Day (Express Day Trip)</option>
                <option value={2}>2 Days (Weekend Exploration)</option>
                <option value={3}>3 Days (Deep Heritage Immersion)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Pacing & Focus
              </label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm bg-[#fcfaf7] border border-stone-300 rounded-xl font-medium"
              >
                <option value="Heritage & Culture">Heritage & Cultural Pacing</option>
                <option value="Photography & Architecture">Photography & Architecture</option>
                <option value="Spiritual & Meditative">Spiritual & Meditative</option>
                <option value="Family Friendly">Family Friendly & Relaxed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Split: Day Schedule & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Day Timeline (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Day Selector Tabs */}
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              {itineraryDays.map((day, idx) => (
                <button
                  key={day.dayNumber}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeDayIndex === idx
                      ? 'bg-[#0B192C] text-white shadow-sm'
                      : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                  }`}
                >
                  Day {day.dayNumber} Plan
                </button>
              ))}
            </div>

            {currentDay && (
              <div className="space-y-5">
                {/* Day Banner */}
                <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-2xl flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-['Outfit'] text-[#0B192C]">
                      Day {currentDay.dayNumber}: {currentDay.title}
                    </h3>
                    <p className="text-xs text-amber-900 mt-0.5">
                      Recommended pacing: Morning start at 8:00 AM for soft sunlight.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      Est. Daily Expenses
                    </span>
                    <span className="text-sm font-bold font-mono text-[#1B4332]">
                      ₹{totalDayExpenses} / person
                    </span>
                  </div>
                </div>

                {/* Vertical Timeline Slots */}
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {/* Slot 1: Morning */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-[#0B192C] text-white flex items-center justify-center text-[10px] font-bold">
                      1
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{currentDay.morning.time}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-800 font-bold">{currentDay.morning.place}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs">
                      {currentDay.morning.activity}
                      <span className="block mt-2 text-[11px] font-mono text-slate-500">
                        Estimated Ticket & Local Transport: ₹{currentDay.morning.estExpense}
                      </span>
                    </p>
                  </div>

                  {/* Slot 2: Lunch */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[10px] font-bold">
                      2
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Authentic Lunch Recommendation</span>
                    </div>
                    <div className="bg-[#fcfaf7] p-3.5 rounded-2xl border border-stone-200/80 space-y-1">
                      <p className="text-xs font-bold text-slate-900">
                        {currentDay.lunch.place}
                      </p>
                      <p className="text-xs text-slate-600">
                        Must-try dish: <span className="font-semibold">{currentDay.lunch.foodItem}</span>
                      </p>
                      <span className="text-[11px] font-mono text-slate-500 block">
                        Estimated Meal: ₹{currentDay.lunch.estExpense}
                      </span>
                    </div>
                  </div>

                  {/* Slot 3: Afternoon */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-[#0B192C] text-white flex items-center justify-center text-[10px] font-bold">
                      3
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{currentDay.afternoon.time}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-800 font-bold">{currentDay.afternoon.place}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs">
                      {currentDay.afternoon.activity}
                      <span className="block mt-2 text-[11px] font-mono text-slate-500">
                        Estimated Expenses: ₹{currentDay.afternoon.estExpense}
                      </span>
                    </p>
                  </div>

                  {/* Slot 4: Evening Sunset/Aarti */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold">
                      4
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentDay.evening.time} · {currentDay.evening.place}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs">
                      {currentDay.evening.activity}
                      <span className="block mt-2 text-[11px] font-mono text-slate-500">
                        Estimated Offering & Refreshment: ₹{currentDay.evening.estExpense}
                      </span>
                    </p>
                  </div>

                  {/* Slot 5: Dinner */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[10px] font-bold">
                      5
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Dinner Recommendation</span>
                    </div>
                    <div className="bg-[#fcfaf7] p-3.5 rounded-2xl border border-stone-200/80 space-y-1">
                      <p className="text-xs font-bold text-slate-900">
                        {currentDay.dinner.place}
                      </p>
                      <p className="text-xs text-slate-600">
                        Specialty: <span className="font-semibold">{currentDay.dinner.foodItem}</span>
                      </p>
                      <span className="text-[11px] font-mono text-slate-500 block">
                        Estimated Dinner: ₹{currentDay.dinner.estExpense}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Interactive Leaflet Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="bg-white border border-stone-200/90 rounded-3xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-slate-800">
                    {selectedDestination.name} Interactive Map
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">OpenStreetMap</span>
              </div>

              {/* Map Canvas */}
              <div
                ref={mapContainerRef}
                className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-200 z-10"
              />

              {/* Map Legend */}
              <div className="pt-2 text-xs text-slate-600 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Attractions on Map:
                </p>
                <div className="space-y-1">
                  {selectedDestination.famousAttractions.map((att, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-4 h-4 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <span className="truncate">{att.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => onOpenFilmPlayer(selectedDestination.id)}
                  className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1B4332] text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Watch Cinematic Film of {selectedDestination.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
