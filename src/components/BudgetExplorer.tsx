import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Film,
  Info,
  Compass,
  ArrowRight,
  TrendingDown,
  Users,
  Calendar,
  Layers,
} from 'lucide-react';
import { BudgetRecommendation } from '../types/travel';
import { fetchBudgetRecommendations, BudgetInputParams } from '../services/api';

interface BudgetExplorerProps {
  onSelectDestination: (destinationId: string) => void;
  onOpenFilmPlayer: (destinationId: string) => void;
}

export const BudgetExplorer: React.FC<BudgetExplorerProps> = ({
  onSelectDestination,
  onOpenFilmPlayer,
}) => {
  const [startingLocation, setStartingLocation] = useState('Delhi / NCR');
  const [totalBudgetINR, setTotalBudgetINR] = useState<number>(12000);
  const [travellers, setTravellers] = useState<number>(2);
  const [durationDays, setDurationDays] = useState<number>(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'history',
    'spirituality',
    'culture',
  ]);
  const [preferredDistance, setPreferredDistance] = useState('Within 200 km');
  const [loading, setLoading] = useState(false);
  const [assumptions, setAssumptions] = useState<string>(
    'Estimates calculated for 2 travellers for a 2-day trip starting from Delhi / NCR. Assumes twin-share standard accommodation, road/train transit, and authentic regional dining.'
  );
  const [recommendations, setRecommendations] = useState<BudgetRecommendation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const interestOptions = [
    { id: 'history', label: 'History & Heritage' },
    { id: 'spirituality', label: 'Spiritual & Sacred' },
    { id: 'nature', label: 'Nature & Landscapes' },
    { id: 'culture', label: 'Culture & Traditions' },
    { id: 'food', label: 'Local Food & Street Eateries' },
    { id: 'photography', label: 'Photography & Architecture' },
    { id: 'adventure', label: 'Outdoor Walks & Hills' },
  ];

  const budgetPresets = [6000, 10000, 15000, 25000, 40000];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((item) => item !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleCalculateBudget = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    const params: BudgetInputParams = {
      startingLocation,
      totalBudgetINR,
      travellers,
      durationDays,
      interests: selectedInterests,
      preferredDistance,
    };

    try {
      const result = await fetchBudgetRecommendations(params);
      setRecommendations(result.recommendations);
      setAssumptions(result.assumptions);
      setHasSearched(true);
    } catch (err) {
      console.error('Failed to get budget recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Run automatically on first render if empty
  React.useEffect(() => {
    if (recommendations.length === 0 && !hasSearched) {
      handleCalculateBudget();
    }
  }, []);

  return (
    <section id="budget-explorer" className="py-12 lg:py-16 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1B4332]">
            <span>AI Budget Explorer</span>
            <span aria-hidden="true">·</span>
            <span>Zero Guesswork Travel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0B192C] tracking-tight">
            Discover What Your Budget Can Unlock
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Enter your total budget in INR, party size, and travel duration. Our AI algorithm calculates comprehensive expense breakdowns—guaranteed to fit strictly within your budget.
          </p>
        </div>

        {/* Input Parameters Box */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <form onSubmit={handleCalculateBudget} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Starting Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1B4332]" />
                  Starting Point
                </label>
                <select
                  value={startingLocation}
                  onChange={(e) => setStartingLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-medium bg-[#fcfaf7] border border-stone-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B192C]/20"
                >
                  <option value="Delhi / NCR">Delhi / NCR</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Ambala">Ambala</option>
                  <option value="Karnal">Karnal</option>
                  <option value="Panipat">Panipat</option>
                  <option value="Jaipur">Jaipur</option>
                </select>
              </div>

              {/* 2. Total Budget with Presets & Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#1B4332]" />
                    Total Budget (INR)
                  </label>
                  <span className="text-sm font-bold text-[#0B192C] font-mono tabular-nums">
                    ₹{totalBudgetINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="4000"
                  max="60000"
                  step="1000"
                  value={totalBudgetINR}
                  onChange={(e) => setTotalBudgetINR(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0B192C]"
                />
                <div className="flex items-center justify-between gap-1 pt-1">
                  {budgetPresets.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setTotalBudgetINR(preset)}
                      className={`text-[11px] px-2 py-0.5 rounded font-mono transition-colors ${
                        totalBudgetINR === preset
                          ? 'bg-[#0B192C] text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      ₹{(preset / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Travellers & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#1B4332]" />
                    Travellers
                  </label>
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-sm font-medium bg-[#fcfaf7] border border-stone-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B192C]/20"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1B4332]" />
                    Duration
                  </label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-sm font-medium bg-[#fcfaf7] border border-stone-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B192C]/20"
                  >
                    {[1, 2, 3, 4, 5].map((d) => (
                      <option key={d} value={d}>
                        {d} {d === 1 ? 'Day' : 'Days'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Preferred Distance */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#1B4332]" />
                  Preferred Distance
                </label>
                <select
                  value={preferredDistance}
                  onChange={(e) => setPreferredDistance(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-medium bg-[#fcfaf7] border border-stone-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B192C]/20"
                >
                  <option value="Under 100 km">Under 100 km (Quick getaway)</option>
                  <option value="Within 200 km">Within 200 km (Ideal weekend)</option>
                  <option value="Within 350 km">Within 350 km (Comfortable drive)</option>
                  <option value="Any Distance">Any Distance in Region</option>
                </select>
              </div>
            </div>

            {/* Interest Multi-Select Options */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Your Travel Interests (Choose all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((opt) => {
                  const isSelected = selectedInterests.includes(opt.id);
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => toggleInterest(opt.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#0B192C] text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  All prices are estimated approximations, not live bookings.
                </span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-[#0B192C] hover:bg-[#1B4332] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Calculating Recommendations...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    Generate Budget Recommendations
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Assumptions Box */}
        {assumptions && (
          <div className="mb-8 p-4 bg-amber-50/70 border border-amber-200/60 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Assumptions Behind Estimated Costs
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">{assumptions}</p>
            </div>
          </div>
        )}

        {/* 3 Suitable Recommendations Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-['Outfit'] text-[#0B192C]">
              Recommended Destinations ({recommendations.length} Matches Found)
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Strictly within ₹{totalBudgetINR.toLocaleString('en-IN')} Budget
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recommendations.map((rec) => {
              const breakdown = rec.costBreakdown;
              const remainingBudget = totalBudgetINR - breakdown.totalEstimatedCost;

              return (
                <div
                  key={rec.destinationId}
                  className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Destination Image with Tag */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <img
                        src={rec.heroImage}
                        alt={rec.destinationName}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[11px] font-semibold bg-white/90 text-slate-900 rounded-lg backdrop-blur-sm shadow-sm">
                          {rec.budgetCategory} Option
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs text-amber-300 font-medium">
                          {rec.stateRegion} · {rec.distanceKm} km away
                        </p>
                        <h4 className="text-xl font-bold font-['Outfit'] leading-tight">
                          {rec.destinationName}
                        </h4>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Why it matches */}
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Why It Matches
                        </p>
                        <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                          {rec.whyItMatches}
                        </p>
                      </div>

                      {/* Detailed Cost Breakdown Table */}
                      <div className="bg-[#fcfaf7] border border-stone-200/70 rounded-2xl p-4 space-y-2.5">
                        <div className="flex items-center justify-between pb-2 border-b border-stone-200 text-xs font-semibold text-slate-700">
                          <span>Expense Category</span>
                          <span>Estimated Cost</span>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-600">
                          <div className="flex justify-between">
                            <span>Travel (Transit/Fuel)</span>
                            <span className="font-mono tabular-nums text-slate-800">
                              ₹{breakdown.travelCost.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Accommodation</span>
                            <span className="font-mono tabular-nums text-slate-800">
                              ₹{breakdown.accommodationCost.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Food & Refreshments</span>
                            <span className="font-mono tabular-nums text-slate-800">
                              ₹{breakdown.foodCost.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Local Transport</span>
                            <span className="font-mono tabular-nums text-slate-800">
                              ₹{breakdown.localTransportCost.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Activities & Monument Tickets</span>
                            <span className="font-mono tabular-nums text-slate-800">
                              ₹{breakdown.activityCost.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0B192C]">
                            Total Estimated Trip Cost:
                          </span>
                          <span className="text-base font-bold font-mono tabular-nums text-[#1B4332]">
                            ₹{breakdown.totalEstimatedCost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Remaining Budget & Duration */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                          <TrendingDown className="w-3.5 h-3.5" />
                          ₹{remainingBudget.toLocaleString('en-IN')} under budget
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Suggested: {rec.suggestedDays} Days
                        </span>
                      </div>

                      {/* Travel Tip */}
                      <p className="text-[11px] text-slate-500 italic bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        💡 <span className="font-semibold text-slate-700">Tip:</span> {rec.travelTip}
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onSelectDestination(rec.destinationId)}
                      className="px-3.5 py-2.5 text-xs font-semibold text-[#0B192C] bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenFilmPlayer(rec.destinationId)}
                      className="px-3.5 py-2.5 text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#1B4332] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Travel Film
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
