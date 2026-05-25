import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Search } from 'lucide-react';

export default function Navbar() {
  const { setCurrentRoute, currentRoute, globalSearchQuery, setGlobalSearchQuery } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearchVal, setLocalSearchVal] = useState(globalSearchQuery);

  React.useEffect(() => {
    setLocalSearchVal(globalSearchQuery);
  }, [globalSearchQuery]);

  const handleSearchChange = (e) => {
    setLocalSearchVal(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setGlobalSearchQuery(localSearchVal);
      setCurrentRoute('explore');
    }
  };

  const navOptions = [
    { label: 'Explore', route: 'explore' },
    { label: 'Hackathons', route: 'explore' },
    { label: 'Showcase', route: 'landing' },
    { label: 'Teams', route: 'explore' },
  ];

  const handleNavigate = (route) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-[3px] border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => handleNavigate('landing')}
          >
            <div className="w-9 h-9 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#000]">
              <span className="text-slate-900 text-lg font-black font-sans">C</span>
            </div>
            <span className="text-base font-black text-slate-900 tracking-tight hidden sm:inline font-sans uppercase">
              Colab<span className="text-blue-600">Hub</span>
            </span>
          </div>

          {/* Desktop Nav Pills */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 border-2 border-slate-900 p-1 rounded-xl shadow-[3px_3px_0px_#000]">
            {navOptions.map((opt) => {
              const isActive = opt.route === currentRoute && opt.label !== 'Hackathons' && opt.label !== 'Teams';
              return (
                <button
                  key={opt.label}
                  onClick={() => handleNavigate(opt.route)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer uppercase tracking-wide ${
                    isActive
                      ? 'bg-amber-400 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#000]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white hover:border-2 hover:border-slate-900/60 border-2 border-transparent'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Search + Sign In */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 stroke-[2.5px]" />
              <input
                placeholder="Search teams..."
                className="w-44 text-xs bg-white border-2 border-slate-900 rounded-xl pl-8 pr-3 py-2 shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-slate-50 transition-all text-slate-900 font-bold"
                type="text"
                value={localSearchVal}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
            <button
              onClick={() => handleNavigate('login')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold uppercase tracking-wide rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavigate('login')}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-extrabold uppercase rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-slate-900 bg-white rounded-xl shadow-[2px_2px_0px_#000] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900 stroke-[2.5px]" /> : <Menu className="w-5 h-5 text-slate-900 stroke-[2.5px]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-slate-900 bg-[#f0f0f0]">
          <div className="px-4 pt-4 pb-5 space-y-3">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5px]" />
              <input
                placeholder="Search teams..."
                className="w-full text-xs bg-white border-2 border-slate-900 rounded-xl pl-9 pr-4 py-2.5 shadow-[2px_2px_0px_#000] focus:outline-none text-slate-900 font-bold"
                type="text"
                value={localSearchVal}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchKeyDown(e);
                    setMobileMenuOpen(false);
                  }
                }}
              />
            </div>

            {/* Mobile Nav Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {navOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleNavigate(opt.route)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all cursor-pointer text-center bg-white border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_#000] hover:bg-amber-400"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
