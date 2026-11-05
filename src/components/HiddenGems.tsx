import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, Calendar, ArrowRight, Film } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types/travel';

interface HiddenGemsProps {
  onSelectDestination: (destId: string) => void;
  onOpenFilmPlayer: (destId: string) => void;
}

export const HiddenGems: React.FC<HiddenGemsProps> = ({
  onSelectDestination,
  onOpenFilmPlayer,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'historical', label: 'Historical & Harappan' },
    { id: 'nature', label: 'Nature & Landscapes' },
    { id: 'spiritual', label: 'Spiritual & Sacred' },
    { id: 'culture', label: 'Cultural & Sufi' },
  ];

  const filtered =
    activeCategory === 'all'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.category === activeCategory);

  return (
    <section id="hidden-gems" className="py-12 lg:py-16 bg-[#f7f4ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1B4332]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Hidden Gems Explorer</span>
              <span aria-hidden="true">·</span>
              <span>Beyond the Obvious</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0B192C] tracking-tight">
              Rediscover the Heart of Regional Heritage
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Step away from crowded tourist circuits. From 7,000-year-old Harappan streets to misty Shivalik pine lakes and Sufi sanctuaries, uncover places that deserve to be cherished.
            </p>
          </div>

          {/* Interactive Category Filter Pills (Button tabs) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0B192C] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-white/90 text-slate-900 rounded-lg backdrop-blur-sm shadow-sm">
                      {dest.district}, {dest.state}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl font-bold font-['Outfit']">{dest.name}</h3>
                    <p className="text-xs text-stone-200 truncate">{dest.tagline}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Why it is worth visiting */}
                  <div className="bg-[#fcfaf7] border border-stone-200/70 rounded-2xl p-3.5 space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1B4332]">
                      Why It’s Worth Visiting:
                    </p>
                    <p className="text-xs text-slate-700 leading-snug">
                      {dest.whyVisit}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{dest.recommendedDuration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{dest.bestTimeToVisit.split('(')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onSelectDestination(dest.id)}
                  className="px-3.5 py-2.5 text-xs font-semibold text-[#0B192C] bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors text-center"
                >
                  Explore Place
                </button>
                <button
                  onClick={() => onOpenFilmPlayer(dest.id)}
                  className="px-3.5 py-2.5 text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#1B4332] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Watch Film
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
