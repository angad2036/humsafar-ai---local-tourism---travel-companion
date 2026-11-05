import React, { useState } from 'react';
import { Search, Film, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface HeroProps {
  onSearchDestination: (query: string) => void;
  onOpenFilmPlayer: (destinationId?: string) => void;
  onExploreClick: () => void;
  onSelectDestination: (destId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchDestination,
  onOpenFilmPlayer,
  onExploreClick,
  onSelectDestination,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = searchQuery.trim()
    ? DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchDestination(searchQuery);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-[#fdfbf7] via-[#f7f3ec] to-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid: Value Proposition + Cinematic Focal Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Proposition & Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed category kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1B4332]">
              <span>Every Journey Has a Story</span>
              <span aria-hidden="true">·</span>
              <span>Local Tourism Reimagined</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-[#0B192C] leading-[1.12] [text-wrap:balance]">
              Your Next Journey <br className="hidden sm:inline" />
              Starts Here.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
              Discover authentic regional destinations based on your exact budget, experience living heritage through narrated cinematic travel films, and travel together with passionate local guides.
            </p>

            {/* Prominent Search Bar */}
            <div className="relative max-w-xl">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-white border border-stone-300 rounded-2xl p-1.5 shadow-sm hover:border-stone-400 focus-within:border-[#0B192C] focus-within:ring-2 focus-within:ring-[#0B192C]/10 transition-all"
              >
                <div className="pl-3 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search destinations (e.g., Kurukshetra, Morni Hills, Pinjore...)"
                  className="w-full px-3 py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0B192C] hover:bg-[#1B4332] rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm"
                >
                  Search
                </button>
              </form>

              {/* Suggestions dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-200 z-50 overflow-hidden divide-y divide-stone-100">
                  {filteredSuggestions.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => {
                        onSelectDestination(dest.id);
                        setShowSuggestions(false);
                        setSearchQuery(dest.name);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-stone-50 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{dest.name}</p>
                          <p className="text-xs text-slate-500">{dest.tagline}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#0B192C] hover:bg-[#1B4332] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                Explore Destinations
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenFilmPlayer('kurukshetra')}
                className="px-6 py-3 text-sm font-semibold text-[#0B192C] bg-white border border-stone-300 hover:border-[#0B192C] rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 whitespace-nowrap"
              >
                <Film className="w-4 h-4 text-amber-600" />
                Create My Travel Film
              </button>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-stone-900 group aspect-[4/3] lg:aspect-[16/11]">
              <img
                src="/src/assets/images/humsafar_hero_kurukshetra_1793858972455.jpg"
                alt="Brahma Sarovar ghats in Kurukshetra at sunset"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Gradient scrim ensuring 4.5:1 legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Foreground Card Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Film Spotlight</span>
                  <span aria-hidden="true">·</span>
                  <span>Haryana Heritage</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] tracking-tight">
                  Kurukshetra: Land of Sacred Waters
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                  Immerse in the timeless hymns of Brahma Sarovar, the sacred banyan of Jyotisar, and the marble majesty of Sheikh Chilli’s mausoleum.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => onOpenFilmPlayer('kurukshetra')}
                    className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white transition-colors"
                  >
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    Watch 6-Scene Film
                  </button>
                  <span className="text-xs text-stone-300 font-medium">Full AI Narration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof / Value Strip below hero split */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0B192C] tabular-nums">
              40+
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Curated Heritage & Hidden Gems
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0B192C] tabular-nums">
              100%
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Transparent Budget Breakdown
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0B192C]">
              Cinematic
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              AI Voice Narrated Travel Films
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0B192C] tabular-nums">
              Local First
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Verified Guides & Group Walks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
