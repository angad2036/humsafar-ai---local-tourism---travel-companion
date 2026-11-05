import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BudgetExplorer } from './components/BudgetExplorer';
import { CinematicFilmPlayer } from './components/CinematicFilmPlayer';
import { HiddenGems } from './components/HiddenGems';
import { GuideConnect } from './components/GuideConnect';
import { GroupExperiences } from './components/GroupExperiences';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { Footer } from './components/Footer';
import { DESTINATIONS } from './data/destinations';
import { Destination } from './types/travel';
import {
  Compass,
  Film,
  Sparkles,
  Users,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedFilmDestId, setSelectedFilmDestId] = useState<string>('kurukshetra');
  const [activeDetailDest, setActiveDetailDest] = useState<Destination | null>(null);

  // Scroll to top on tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFilmPlayer = (destId: string = 'kurukshetra') => {
    setSelectedFilmDestId(destId);
    setActiveTab('film');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestination = (destId: string) => {
    const dest = DESTINATIONS.find((d) => d.id === destId) || DESTINATIONS[0];
    setActiveDetailDest(dest);
  };

  const handleSearchDestination = (query: string) => {
    const match = DESTINATIONS.find(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.district.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      setActiveDetailDest(match);
    } else {
      setActiveTab('explore');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#0f172a]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenFilmPlayer={handleOpenFilmPlayer}
      />

      {/* Main Body depending on active tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onSearchDestination={handleSearchDestination}
              onOpenFilmPlayer={handleOpenFilmPlayer}
              onExploreClick={() => handleTabChange('explore')}
              onSelectDestination={handleSelectDestination}
            />

            {/* How HUMSAFAR Works (Numbered Service Flow) */}
            <section className="py-12 sm:py-16 bg-[#f7f3ec] border-y border-stone-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1B4332]">
                    <span>How HUMSAFAR Works</span>
                    <span aria-hidden="true">·</span>
                    <span>3 Thoughtful Steps</span>
                  </div>
                  <h2 className="text-3xl font-bold font-['Outfit'] text-[#0B192C]">
                    Travel Designed For Discovery, Not Just Checklists
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
                    <span className="text-2xl font-bold font-mono text-[#D4AF37]">01.</span>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#0B192C]">
                      Set Your Budget & Rhythm
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Enter your budget in INR, traveller count, and personal interests. Our AI explorer matches real destinations strictly within your spend limit with complete itemized costs.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
                    <span className="text-2xl font-bold font-mono text-[#1B4332]">02.</span>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#0B192C]">
                      Experience The Travel Film
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Before packing your bags, immerse in an AI-narrated 6-scene documentary introducing the history, famous landmarks, food, and quiet hidden corners of your chosen place.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
                    <span className="text-2xl font-bold font-mono text-[#0B192C]">03.</span>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#0B192C]">
                      Walk With Local Storytellers
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Connect directly with resident community guides or join small group heritage and nature walks led by trusted grassroots organizers.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Destinations Preview */}
            <section className="py-12 sm:py-16 bg-[#fdfbf7]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#1B4332] uppercase tracking-wider">
                      Curated Corridors
                    </span>
                    <h2 className="text-3xl font-bold font-['Outfit'] text-[#0B192C] mt-1">
                      Featured Regional Destinations
                    </h2>
                  </div>
                  <button
                    onClick={() => handleTabChange('explore')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B192C] hover:text-[#1B4332] transition-colors"
                  >
                    View All Destinations
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {DESTINATIONS.slice(0, 3).map((dest) => (
                    <div
                      key={dest.id}
                      className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-xs text-amber-300 font-medium">
                            {dest.district}, {dest.state}
                          </p>
                          <h3 className="text-lg font-bold font-['Outfit']">{dest.name}</h3>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {dest.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-stone-100">
                          <span>{dest.recommendedDuration}</span>
                          <span className="font-mono font-semibold text-slate-800">
                            ~₹{dest.estimatedDailyBudgetPerPerson.totalEstimatedCost}/day
                          </span>
                        </div>
                      </div>

                      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleSelectDestination(dest.id)}
                          className="py-2 text-xs font-semibold text-[#0B192C] bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleOpenFilmPlayer(dest.id)}
                          className="py-2 text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#1B4332] rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
                        >
                          <Film className="w-3.5 h-3.5 text-amber-400" />
                          Film
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* AI Budget Explorer Section */}
            <BudgetExplorer
              onSelectDestination={handleSelectDestination}
              onOpenFilmPlayer={handleOpenFilmPlayer}
            />

            {/* Signature Film Experience Embed */}
            <CinematicFilmPlayer initialDestinationId={selectedFilmDestId} />

            {/* Hidden Gems Section */}
            <HiddenGems
              onSelectDestination={handleSelectDestination}
              onOpenFilmPlayer={handleOpenFilmPlayer}
            />

            {/* Local Guides Preview */}
            <GuideConnect />

            {/* Group Experiences Section */}
            <GroupExperiences />
          </div>
        )}

        {/* Explore Destinations Tab */}
        {activeTab === 'explore' && (
          <div className="py-6">
            <HiddenGems
              onSelectDestination={handleSelectDestination}
              onOpenFilmPlayer={handleOpenFilmPlayer}
            />
          </div>
        )}

        {/* Budget Explorer Tab */}
        {activeTab === 'budget' && (
          <BudgetExplorer
            onSelectDestination={handleSelectDestination}
            onOpenFilmPlayer={handleOpenFilmPlayer}
          />
        )}

        {/* Travel Films Tab */}
        {activeTab === 'film' && (
          <div className="py-4">
            <CinematicFilmPlayer initialDestinationId={selectedFilmDestId} />
          </div>
        )}

        {/* Local Guides Tab */}
        {activeTab === 'guides' && (
          <div className="py-4">
            <GuideConnect />
          </div>
        )}

        {/* Group Experiences Tab */}
        {activeTab === 'groups' && (
          <div className="py-4">
            <GroupExperiences />
          </div>
        )}

        {/* Itinerary Planner Tab */}
        {activeTab === 'itinerary' && (
          <div className="py-4">
            <ItineraryPlanner
              initialDestinationId={selectedFilmDestId}
              onOpenFilmPlayer={handleOpenFilmPlayer}
            />
          </div>
        )}
      </main>

      {/* Destination Deep-Dive Modal */}
      {activeDetailDest && (
        <DestinationDetailModal
          destination={activeDetailDest}
          onClose={() => setActiveDetailDest(null)}
          onOpenFilmPlayer={handleOpenFilmPlayer}
          onFindGuide={() => {
            setActiveTab('guides');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Footer */}
      <Footer onNavClick={handleTabChange} />
    </div>
  );
}
