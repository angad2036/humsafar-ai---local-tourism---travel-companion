import React, { useState } from 'react';
import {
  Users,
  Star,
  MapPin,
  Calendar,
  Languages,
  Award,
  CheckCircle2,
  X,
  MessageSquare,
  ShieldAlert,
} from 'lucide-react';
import { LOCAL_GUIDES, DESTINATIONS } from '../data/destinations';
import { LocalGuide } from '../types/travel';

export const GuideConnect: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<LocalGuide | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Form fields
  const [guideDestination, setGuideDestination] = useState<string>('Kurukshetra');
  const [bookingDate, setBookingDate] = useState<string>('2026-11-15');
  const [groupSize, setGroupSize] = useState<number>(2);
  const [experienceType, setExperienceType] = useState<string>('Heritage & Architecture Walk');
  const [travelerName, setTravelerName] = useState<string>('');
  const [travelerContact, setTravelerContact] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const handleOpenBooking = (guide: LocalGuide) => {
    setSelectedGuide(guide);
    setBookingSuccess(false);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking storage in localStorage
    const booking = {
      id: `req-${Date.now()}`,
      guideId: selectedGuide?.id,
      guideName: selectedGuide?.name,
      destination: guideDestination,
      date: bookingDate,
      groupSize,
      experienceType,
      travelerName,
      travelerContact,
      specialNotes,
      status: 'Confirmed Demo Request',
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('humsafar_guide_requests') || '[]');
    existing.push(booking);
    localStorage.setItem('humsafar_guide_requests', JSON.stringify(existing));

    setBookingSuccess(true);
  };

  return (
    <section id="local-guides" className="py-12 lg:py-16 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1B4332]">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Local Guide Connect</span>
            <span aria-hidden="true">·</span>
            <span>Community Storytellers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0B192C] tracking-tight">
            Explore With People Who Call This Land Home
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            History is best experienced through living memory. Connect with resident historians, folk storytellers, and naturalists for immersive, responsible travel.
          </p>
        </div>

        {/* Demo profiles notice */}
        <div className="p-3.5 bg-stone-100 border border-stone-200 rounded-2xl flex items-center gap-2.5 text-xs text-stone-600">
          <ShieldAlert className="w-4 h-4 text-stone-500 shrink-0" />
          <span>
            <strong className="font-semibold text-slate-800">Notice:</strong> Profiles below represent verified local community guides and curated sample profiles prepared for the HUMSAFAR AI hackathon presentation.
          </span>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOCAL_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Profile Header */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-stone-200 shrink-0">
                    <img
                      src={guide.avatar}
                      alt={guide.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#0B192C] font-['Outfit'] truncate">
                      {guide.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{guide.location}</span>
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        {guide.rating}
                      </span>
                      <span className="text-[11px] text-slate-400">({guide.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Experience & Languages */}
                <div className="space-y-1.5 text-xs text-slate-600 border-t border-b border-stone-100 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{guide.yearsExperience} Years Guiding Experience</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{guide.languages.join(', ')}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {guide.bio}
                </p>

                {/* Expertise Badges */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Specialties:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {guide.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 mt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-slate-500">Indicative Rate:</span>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#0B192C]">
                      ₹{guide.dailyRateINR}
                    </span>
                    <span className="text-[10px] text-slate-500"> / full day</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(guide)}
                  className="w-full py-2.5 px-4 bg-[#0B192C] hover:bg-[#1B4332] text-white rounded-xl text-xs font-semibold transition-all shadow-sm hover:shadow text-center flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Request Guide
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guide Booking Modal */}
        {showBookingModal && selectedGuide && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-stone-200">
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-['Outfit'] text-[#0B192C]">
                      Request Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Your guide request for <span className="font-semibold text-slate-800">{selectedGuide.name}</span> has been logged for {bookingDate}.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl text-xs text-slate-600 text-left space-y-1 border border-stone-200">
                    <p><strong>Destination:</strong> {guideDestination}</p>
                    <p><strong>Group:</strong> {groupSize} travellers</p>
                    <p><strong>Experience:</strong> {experienceType}</p>
                  </div>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="w-full py-2.5 bg-[#0B192C] text-white rounded-xl text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                      <img
                        src={selectedGuide.avatar}
                        alt={selectedGuide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-['Outfit'] text-[#0B192C]">
                        Request {selectedGuide.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {selectedGuide.location} · ₹{selectedGuide.dailyRateINR}/day
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Destination
                        </label>
                        <select
                          value={guideDestination}
                          onChange={(e) => setGuideDestination(e.target.value)}
                          className="w-full p-2.5 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                        >
                          {DESTINATIONS.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          required
                          className="w-full p-2 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Group Size
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={groupSize}
                          onChange={(e) => setGroupSize(Number(e.target.value))}
                          className="w-full p-2 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Experience Focus
                        </label>
                        <select
                          value={experienceType}
                          onChange={(e) => setExperienceType(e.target.value)}
                          className="w-full p-2 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                        >
                          <option value="Heritage & Architecture Walk">Heritage & Architecture</option>
                          <option value="Spiritual & Sacred Tirthas">Spiritual & Sacred</option>
                          <option value="Archaeology & Harappan Sites">Archaeology Exploration</option>
                          <option value="Nature Trail & Birding">Nature Trail & Birding</option>
                          <option value="Old Town Culinary Tour">Old Town Culinary Walk</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={travelerName}
                        onChange={(e) => setTravelerName(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Contact (Phone or Email)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={travelerContact}
                        onChange={(e) => setTravelerContact(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Special Requests or Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g., Senior citizen friendly walking pace, specific interest in miniature paintings..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0B192C] hover:bg-[#1B4332] text-white font-semibold rounded-xl text-xs transition-colors shadow-md"
                    >
                      Submit Booking Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
