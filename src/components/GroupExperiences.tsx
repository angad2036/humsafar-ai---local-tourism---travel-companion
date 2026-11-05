import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Check,
  X,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { GROUP_EXPERIENCES } from '../data/destinations';
import { GroupExperience } from '../types/travel';

export const GroupExperiences: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<GroupExperience | null>(null);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [showGuidelines, setShowGuidelines] = useState<boolean>(false);
  const [joinSuccess, setJoinSuccess] = useState<boolean>(false);

  // Join form state
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerCount, setTravelerCount] = useState(1);
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false);

  const handleOpenJoin = (exp: GroupExperience) => {
    setSelectedExp(exp);
    setJoinSuccess(false);
    setShowJoinModal(true);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedGuidelines) {
      alert('Please agree to the HUMSAFAR Community & Responsible Travel Guidelines to proceed.');
      return;
    }

    const joinRecord = {
      id: `join-${Date.now()}`,
      experienceId: selectedExp?.id,
      experienceTitle: selectedExp?.title,
      destination: selectedExp?.destination,
      date: selectedExp?.date,
      travelerName,
      travelerEmail,
      travelerCount,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('humsafar_group_joins') || '[]');
    existing.push(joinRecord);
    localStorage.setItem('humsafar_group_joins', JSON.stringify(existing));

    setJoinSuccess(true);
  };

  return (
    <section id="group-experiences" className="py-12 lg:py-16 bg-[#f7f3ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1B4332]">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Group Experiences</span>
              <span aria-hidden="true">·</span>
              <span>Travel Together</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0B192C] tracking-tight">
              Shared Journeys With Fellow Wanderers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Experience places in curated small groups led by certified local collectives. From sunset temple walks to Harappan pottery workshops and mountain dawn birding.
            </p>
          </div>

          <button
            onClick={() => setShowGuidelines(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-slate-700 hover:bg-stone-50 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Community & Safety Guidelines
          </button>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GROUP_EXPERIENCES.map((exp) => {
            const spotsRemaining = exp.groupSizeLimit - exp.currentBooked;
            const percentFilled = (exp.currentBooked / exp.groupSizeLimit) * 100;

            return (
              <div
                key={exp.id}
                className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Image + Badges */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-900">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-white/95 text-slate-900 rounded-lg shadow-sm">
                        {exp.category}
                      </span>
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 rounded-lg backdrop-blur-sm border border-emerald-500/30">
                        {exp.organizer.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-xs text-amber-300 font-medium">{exp.destination}</p>
                      <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] leading-tight">
                        {exp.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Time, Date, Meeting Point */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-[#fcfaf7] p-3 rounded-2xl border border-stone-200/70">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#1B4332] shrink-0" />
                        <span>{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#1B4332] shrink-0" />
                        <span>{exp.time}</span>
                      </div>
                      <div className="col-span-2 flex items-start gap-1.5 pt-1 border-t border-stone-200/50">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="truncate">Meeting: {exp.meetingPoint}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Experience Highlights:
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {exp.highlights.map((hl, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] mt-1.5 shrink-0" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-500">Group Capacity</span>
                        <span className="text-slate-800 font-mono">
                          {exp.currentBooked} / {exp.groupSizeLimit} Booked (
                          <span className="text-emerald-700 font-bold">{spotsRemaining} left</span>)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / Join Request */}
                <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Fee per Person
                    </span>
                    <span className="text-lg font-bold font-mono text-[#0B192C]">
                      ₹{exp.pricePerPersonINR}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenJoin(exp)}
                    className="px-6 py-2.5 bg-[#0B192C] hover:bg-[#1B4332] text-white rounded-xl text-xs font-semibold transition-all shadow-sm hover:shadow"
                  >
                    Join Experience
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join Request Modal */}
        {showJoinModal && selectedExp && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-stone-200">
              <button
                onClick={() => setShowJoinModal(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {joinSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-['Outfit'] text-[#0B192C]">
                      Spot Reserved!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      You are confirmed for <span className="font-semibold">{selectedExp.title}</span> on {selectedExp.date}.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl text-xs text-slate-600 text-left space-y-1 border border-stone-200">
                    <p><strong>Meeting Point:</strong> {selectedExp.meetingPoint}</p>
                    <p><strong>Time:</strong> {selectedExp.time}</p>
                    <p><strong>Travelers:</strong> {travelerCount}</p>
                  </div>
                  <button
                    onClick={() => setShowJoinModal(false)}
                    className="w-full py-2.5 bg-[#0B192C] text-white rounded-xl text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Organized Walk</span>
                    </div>
                    <h3 className="text-xl font-bold font-['Outfit'] text-[#0B192C]">
                      Join {selectedExp.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedExp.date} · {selectedExp.time} · ₹{selectedExp.pricePerPersonINR}/person
                    </p>
                  </div>

                  <form onSubmit={handleJoinSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Ananya Verma"
                        value={travelerName}
                        onChange={(e) => setTravelerName(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={travelerEmail}
                        onChange={(e) => setTravelerEmail(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Number of Persons
                      </label>
                      <select
                        value={travelerCount}
                        onChange={(e) => setTravelerCount(Number(e.target.value))}
                        className="w-full p-2.5 text-xs bg-[#fcfaf7] border border-stone-300 rounded-xl"
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Person' : 'Persons'} (₹
                            {(n * selectedExp.pricePerPersonINR).toLocaleString('en-IN')})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Community Guidelines Checkbox */}
                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptedGuidelines}
                          onChange={(e) => setAcceptedGuidelines(e.target.checked)}
                          className="mt-0.5 rounded text-[#0B192C] focus:ring-0"
                        />
                        <span className="text-xs text-slate-700 leading-snug">
                          I agree to HUMSAFAR Community Guidelines: mutual respect, punctuality at meeting points, no plastic littering, and zero tolerance for harassment.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!acceptedGuidelines}
                      className="w-full py-3 bg-[#0B192C] hover:bg-[#1B4332] disabled:opacity-40 text-white font-semibold rounded-xl text-xs transition-colors shadow-md"
                    >
                      Confirm Join Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* Community Guidelines Modal */}
        {showGuidelines && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative border border-stone-200">
              <button
                onClick={() => setShowGuidelines(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 text-[#1B4332]">
                <HeartHandshake className="w-6 h-6" />
                <h3 className="text-xl font-bold font-['Outfit'] text-[#0B192C]">
                  HUMSAFAR Community Guidelines
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  <strong>1. Responsible Tourism:</strong> We cherish sacred ghats, ancient archaeological mounds, and tranquil hill valleys. Carry reusable water containers and leave zero trace.
                </p>
                <p>
                  <strong>2. Community Safety & Privacy:</strong> Personal contact numbers and private real-time coordinates are never broadcast publicly. Group walks operate exclusively at public landmarks with designated coordinators.
                </p>
                <p>
                  <strong>3. Cultural Sensitivity:</strong> Observe local decorum regarding photography and attire at sanctified shrines, tombs, and prayer centers.
                </p>
                <p>
                  <strong>4. Report & Block:</strong> Any inappropriate conduct can be reported immediately to safety@humsafar.ai for swift review and coordinator banning.
                </p>
              </div>

              <button
                onClick={() => setShowGuidelines(false)}
                className="w-full py-2.5 bg-[#0B192C] text-white rounded-xl text-xs font-semibold"
              >
                Understood & Agreed
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
