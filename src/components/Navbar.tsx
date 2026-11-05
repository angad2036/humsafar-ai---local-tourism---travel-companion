import React, { useState } from 'react';
import { Compass, Menu, X, Sparkles, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenFilmPlayer: (destinationId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenFilmPlayer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Explore' },
    { id: 'budget', label: 'Budget Explorer' },
    { id: 'film', label: 'Travel Films' },
    { id: 'guides', label: 'Local Guides' },
    { id: 'groups', label: 'Group Experiences' },
    { id: 'itinerary', label: 'Itinerary Planner' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-8">
          {/* Zone 1: Single text element wordmark with elegant emblem */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="HUMSAFAR AI Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0B192C] flex items-center justify-center text-[#D4AF37] shadow-sm group-hover:bg-[#1B4332] transition-colors">
              <Compass className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Outfit'] text-xl font-bold tracking-tight text-[#0B192C] flex items-center gap-1.5">
                HUMSAFAR
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold tracking-wider">
                  AI
                </span>
              </span>
            </div>
          </button>

          {/* Zone 2: 4-6 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#0B192C] font-semibold'
                      : 'text-slate-600 hover:text-[#0B192C]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveTab('budget');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#1B4332] rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Budget Explorer
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fdfbf7] border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="grid grid-cols-1 gap-1 text-base font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === 'home' ? 'bg-stone-200/70 text-[#0B192C] font-semibold' : 'text-slate-700 hover:bg-stone-100'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === link.id
                    ? 'bg-stone-200/70 text-[#0B192C] font-semibold'
                    : 'text-slate-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={() => {
                setActiveTab('budget');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#0B192C] rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Start AI Budget Explorer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
