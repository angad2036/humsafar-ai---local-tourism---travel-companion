import React from 'react';
import { Compass, Heart, Shield, MapPin, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#0B192C] text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1B4332] flex items-center justify-center text-[#D4AF37]">
                <Compass className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-['Outfit'] text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                HUMSAFAR
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-semibold">
                  AI
                </span>
              </span>
            </div>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Every Journey Has a Story.
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An AI-powered local tourism platform created to highlight heritage sites, lesser-known gems, local guides, and small businesses beyond crowded tourist trails.
            </p>
            <div className="text-[11px] text-stone-500 pt-1">
              Built with care for regional cultural preservation.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              Explore
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavClick('explore')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Featured Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('budget')}
                  className="hover:text-amber-300 transition-colors"
                >
                  AI Budget Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('film')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Cinematic Travel Films
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('itinerary')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Itinerary Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Guides */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              Community
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavClick('guides')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Local Guide Connect
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('groups')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Group Experiences
                </button>
              </li>
              <li>
                <span className="text-stone-500">Responsible Travel Charter</span>
              </li>
              <li>
                <span className="text-stone-500">Guide Verification Process</span>
              </li>
            </ul>
          </div>

          {/* Trust & Pledge */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              Local First Pledge
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              We pledge to support indigenous artisans, certified historians, and regional homestays. All budget estimates are modeled transparently.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-stone-400">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>contact@humsafar.ai</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} HUMSAFAR AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-stone-400 cursor-pointer">Community Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
