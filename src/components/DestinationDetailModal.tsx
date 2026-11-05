import React from 'react';
import {
  X,
  MapPin,
  Clock,
  Calendar,
  Film,
  Users,
  Utensils,
  Sparkles,
  Compass,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { Destination } from '../types/travel';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onOpenFilmPlayer: (destId: string) => void;
  onFindGuide: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onOpenFilmPlayer,
  onFindGuide,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-stone-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] overflow-hidden bg-stone-900 rounded-t-3xl">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider">
              <span>{destination.district}, {destination.state}</span>
              <span aria-hidden="true">·</span>
              <span>{destination.recommendedDuration}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Outfit']">
              {destination.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Best: {destination.bestTimeToVisit.split('(')[0]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#1B4332]" />
                <span>{destination.distanceFromDelhiKm} km from Delhi</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenFilmPlayer(destination.id);
                }}
                className="px-4 py-2.5 bg-[#0B192C] hover:bg-[#1B4332] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                Generate Travel Film
              </button>
              <button
                onClick={() => {
                  onClose();
                  onFindGuide();
                }}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-slate-600" />
                Find Local Guide
              </button>
            </div>
          </div>

          {/* Overview & History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-['Outfit']">
                Cultural Significance
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {destination.description}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-['Outfit']">
                Historical Legacy
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {destination.history}
              </p>
            </div>
          </div>

          {/* Famous Attractions */}
          <div className="space-y-3">
            <h3 className="text-base font-bold font-['Outfit'] text-[#0B192C]">
              Famous Monuments & Sacred Sites
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destination.famousAttractions.map((att, i) => (
                <div
                  key={i}
                  className="p-4 bg-[#fcfaf7] border border-stone-200/80 rounded-2xl space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{att.name}</h4>
                    {att.entryFee && (
                      <span className="text-[10px] text-emerald-700 font-medium">
                        {att.entryFee}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {att.description}
                  </p>
                  {att.timing && (
                    <p className="text-[10px] text-slate-400 pt-1">
                      Hours: {att.timing}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Gems & Delicacies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hidden Gems */}
            <div className="space-y-3">
              <h3 className="text-base font-bold font-['Outfit'] text-[#0B192C]">
                Lesser-Known Hidden Gems
              </h3>
              <div className="space-y-2.5">
                {destination.hiddenGems.map((gem, i) => (
                  <div key={i} className="p-3 bg-stone-50 border border-stone-200/70 rounded-xl space-y-1">
                    <p className="text-xs font-bold text-slate-800">{gem.name}</p>
                    <p className="text-xs text-slate-600">{gem.description}</p>
                    <p className="text-[10px] text-amber-800 italic">Location: {gem.locationNote}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Delicacies */}
            <div className="space-y-3">
              <h3 className="text-base font-bold font-['Outfit'] text-[#0B192C]">
                Local Food & Delicacies
              </h3>
              <div className="space-y-2.5">
                {destination.localDelicacies.map((food, i) => (
                  <div key={i} className="p-3 bg-[#fcfaf7] border border-stone-200/70 rounded-xl space-y-1">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Utensils className="w-3 h-3 text-[#1B4332]" />
                      {food.name}
                    </p>
                    <p className="text-xs text-slate-600">{food.description}</p>
                    {food.mustTryAt && (
                      <p className="text-[10px] text-slate-500">Must try at: {food.mustTryAt}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Tips & Estimated Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Essential Traveler Tips
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#f7f4ee] p-4 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Indicative Daily Budget</span>
                <span className="font-mono text-emerald-800 text-sm">
                  ₹{destination.estimatedDailyBudgetPerPerson.totalEstimatedCost} / person
                </span>
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Includes twin-sharing accommodation (~₹{destination.estimatedDailyBudgetPerPerson.accommodationCost}), three meals, regional transport, and monument entries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
