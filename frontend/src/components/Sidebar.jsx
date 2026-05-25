import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar() {
  const { currentRoute, setCurrentRoute, currentUser, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: 'dashboard' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, route: 'dashboard' },
    { id: 'explore', label: 'Team Finder', icon: Users, route: 'explore' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, route: 'dashboard' },
    { id: 'profile', label: 'Profile', icon: User, route: 'profile' },
    { id: 'settings', label: 'Settings', icon: Settings, route: 'dashboard' }
  ];

  const handleNavigate = (route) => {
    setCurrentRoute(route);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Sidebar Hamburger Toggle */}
      <div 
        className="lg:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_#000] cursor-pointer hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all" 
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r-[3px] border-slate-900 flex flex-col justify-between
        transition-transform duration-300 lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Branding Section */}
        <div className="p-6 border-b-2 border-slate-900 bg-slate-50">
          <div className="flex items-center gap-3">
            {/* Custom Logo (White Square with bold black C, black border and shadow) */}
            <div className="w-10 h-10 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#000] shrink-0">
              <span className="text-slate-900 text-xl font-black font-sans">C</span>
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-none uppercase">ColabSpace</h1>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Productivity Hub</span>
            </div>
          </div>
        </div>

        {/* Mid Navigation Links */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pt-6">
          <div className="pb-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase pl-3">
            Navigation
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.route)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 group cursor-pointer
                  ${isActive 
                    ? 'bg-amber-400 text-slate-900 border-2 border-slate-900 shadow-[3px_3px_0px_#000]' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-2 border-transparent hover:border-slate-900/60'
                  }
                `}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom User Card */}
        <div className="p-4 border-t-2 border-slate-900 bg-slate-50">
          <div className="flex items-center gap-3 mb-3 pl-1 p-2 border-2 border-slate-900 bg-white rounded-xl shadow-[2px_2px_0px_#000]">
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.name} 
              className="w-9 h-9 rounded-lg object-cover border-2 border-slate-900 shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">{currentUser?.name}</h4>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide truncate">{currentUser?.title}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold rounded-xl shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-900" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
