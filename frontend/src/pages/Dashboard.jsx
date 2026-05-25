import React from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import { 
  Bell, 
  Plus, 
  TrendingUp, 
  Award, 
  Eye, 
  Users, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react';

export default function Dashboard() {
  const { 
    currentUser, 
    notifications, 
    applications, 
    opportunities, 
    setProjectModalOpen,
    handleNotificationAction,
    setCurrentRoute
  } = useApp();

  const unreadCount = notifications.filter(n => n.type === 'request' ? n.status === 'pending' : !n.read).length;

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 lg:pl-64 min-w-0 pb-16">
        
        {/* Top Header Panel */}
        <header className="bg-white border-b-[3px] border-slate-900 sticky top-0 z-30 px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Home</span>
            <span className="text-slate-400 font-bold">/</span>
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">My Workspace</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Bell Icon Notification Indicator */}
            <div 
              className="relative cursor-pointer p-2 bg-white border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              onClick={() => setCurrentRoute('profile')}
            >
              <Bell className="w-4 h-4 text-slate-900" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900" />
              )}
            </div>
            
            <button
              onClick={() => setProjectModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3px]" />
              New Project
            </button>
          </div>
        </header>

        {/* Content Pane */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-8 space-y-8">
          
          {/* Welcome Message */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Hey {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mt-1">
              Here is what's happening with your projects today.
            </p>
          </div>

          {/* Simple Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Profile Views */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_#000] flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Profile Views</span>
                <h3 className="text-2xl font-black text-slate-900 font-sans">{currentUser.profileViews.toLocaleString()}</h3>
                <span className="text-[10px] font-bold text-emerald-600">
                  {currentUser.profileViewsGrowth}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_#000]">
                <Eye className="w-4.5 h-4.5 stroke-[2.5px]" />
              </div>
            </div>

            {/* Project Reach */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_#000] flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Project views</span>
                <h3 className="text-2xl font-black text-slate-900 font-sans">{currentUser.projectReach}</h3>
                <span className="text-[10px] font-bold text-slate-500">
                  {currentUser.projectReachGrowth} this week
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_#000]">
                <Users className="w-4.5 h-4.5 stroke-[2.5px]" />
              </div>
            </div>

            {/* Reliability */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_#000] flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Reliability</span>
                <h3 className="text-2xl font-black text-slate-900 font-sans">{currentUser.reliability}%</h3>
                <span className="text-[10px] font-extrabold text-emerald-600">
                  {currentUser.reliabilityDesc}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_#000]">
                <Award className="w-4.5 h-4.5 stroke-[2.5px]" />
              </div>
            </div>

          </div>

          {/* Grid: Opportunities & Simple Applications vs. Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content Column (Col 8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Simplified Team Matches (Opportunities) */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[6px_6px_0px_#000] space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Curated Matches</h3>
                  <p className="text-[11px] text-slate-500 font-bold mt-1">
                    Matching team projects looking for your <span className="text-slate-900 font-bold bg-amber-300 border border-slate-900 px-1.5 py-0.5 rounded text-[9px] shadow-[1px_1px_0px_#000]">React</span> skills.
                  </p>
                </div>

                {/* Simplified Card List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {opportunities.map((opp) => (
                    <div 
                      key={opp.id} 
                      className="border-2 border-slate-900 rounded-2xl p-5 bg-slate-50 hover:bg-white shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] font-extrabold px-2 py-0.5 bg-white border border-slate-900 text-slate-900 rounded uppercase tracking-wider shadow-[1px_1px_0px_#000]">
                            {opp.type}
                          </span>
                          <span className="text-[10px] text-slate-500 font-extrabold uppercase">{opp.sub}</span>
                        </div>

                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{opp.title}</h4>
                        <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-medium">
                          {opp.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
                        <div className="flex -space-x-1">
                          {opp.avatars.map((av, idx) => (
                            <img key={idx} src={av} className="w-5 h-5 rounded-full object-cover border border-slate-900" alt="avatar" />
                          ))}
                        </div>
                        
                        <button 
                          onClick={() => setCurrentRoute('explore')}
                          className="px-3 py-1.5 border-2 border-slate-900 bg-white hover:bg-slate-100 text-xs font-extrabold text-slate-900 rounded-lg shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simplified Humanized My Applications List */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[6px_6px_0px_#000] space-y-5">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">My Applications</h3>
                </div>

                {/* Cards Stack replacing busy table */}
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div 
                      key={app.id} 
                      className="border-2 border-slate-900 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-slate-900 text-sm">{app.project}</h4>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wide uppercase ${
                            app.status === 'Accepted' 
                              ? 'bg-emerald-400 text-slate-900 border-2 border-slate-900 shadow-[1px_1px_0px_#000]' 
                              : 'bg-blue-400 text-slate-900 border-2 border-slate-900 shadow-[1px_1px_0px_#000]'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-bold">Applied as <span className="text-slate-900 font-black">{app.role}</span></p>
                      </div>

                      {/* Progress and Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto">
                        <div className="text-left sm:text-right min-w-[120px]">
                          <span className="text-[10px] text-slate-500 font-extrabold block">{app.timeline}</span>
                          <div className="w-24 bg-white border-2 border-slate-900 rounded-full h-3 mt-1 overflow-hidden shadow-[1px_1px_0px_#000]">
                            <div 
                              className={`h-full border-r border-slate-900 transition-all duration-500 ${
                                app.status === 'Accepted' ? 'bg-emerald-400' : 'bg-blue-400'
                              }`} 
                              style={{ width: `${app.progress}%` }} 
                            />
                          </div>
                        </div>

                        <div>
                          {app.status === 'Accepted' ? (
                            <button 
                              onClick={() => setCurrentRoute('profile')}
                              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white border-2 border-slate-900 font-extrabold text-xs rounded-xl shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                            >
                              Join Workspace
                            </button>
                          ) : (
                            <button className="p-2 border-2 border-transparent hover:border-slate-900 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
                              <MoreHorizontal className="w-4 h-4 stroke-[2.5px]" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {applications.length === 0 && (
                    <div className="py-6 text-center text-xs text-slate-400 italic">
                      No active requests submitted yet.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Feed Column (Col 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Activity Feed Panel */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[6px_6px_0px_#000] space-y-5">
                <div className="flex justify-between items-center pb-3 border-b-2 border-slate-100">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Updates & Feed</h3>
                </div>

                <div className="space-y-5">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex gap-3 text-xs">
                      
                      {/* Left side Circle Icon/Avatar */}
                      <div className="shrink-0 animate-in zoom-in-50 duration-200">
                        {notif.type === 'request' ? (
                          <img 
                            src={notif.avatar} 
                            alt={notif.user} 
                            className="w-7 h-7 rounded-full object-cover border-2 border-slate-900"
                          />
                        ) : (
                          <div className="w-7 h-7 bg-blue-100 text-slate-900 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-[1px_1px_0px_#000]">
                            <Info className="w-3.5 h-3.5 stroke-[2.5px]" />
                          </div>
                        )}
                      </div>

                      {/* Right side Detail Text */}
                      <div className="space-y-2 flex-1">
                        <div>
                          {notif.type === 'request' ? (
                            <p className="text-slate-700 leading-normal font-bold">
                              <span className="font-black text-slate-900">{notif.user}</span> {notif.actionText} <span className="font-black text-slate-900">{notif.target}</span>
                            </p>
                          ) : (
                            <div className="text-slate-700 leading-normal font-bold">
                              <span className="font-black text-slate-900">{notif.title}</span> <br />
                              <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">{notif.actionText}</span>
                            </div>
                          )}
                          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide block mt-0.5">{notif.time}</span>
                        </div>

                        {/* Interactive Buttons for requests */}
                        {notif.type === 'request' && notif.status === 'pending' && (
                          <div className="flex gap-2 pt-0.5">
                            <button 
                              onClick={() => handleNotificationAction(notif.id, 'accept')}
                              className="px-2.5 py-1 bg-emerald-400 text-slate-900 border-2 border-slate-900 font-extrabold text-[10px] rounded-lg shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => setCurrentRoute('profile')}
                              className="px-2.5 py-1 bg-white border-2 border-slate-900 hover:bg-slate-100 text-slate-900 font-extrabold text-[10px] rounded-lg shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                            >
                              View Profile
                            </button>
                          </div>
                        )}

                        {notif.type === 'request' && notif.status === 'accepted' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-slate-900 bg-emerald-400 border border-slate-900 px-2 py-0.5 rounded-md shadow-[1px_1px_0px_#000]">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Joined team
                          </span>
                        )}

                        {notif.type === 'request' && notif.status === 'declined' && (
                          <span className="text-[10px] font-extrabold text-slate-500 bg-white border border-slate-900 px-2 py-0.5 rounded-md shadow-[1px_1px_0px_#000] block w-max">
                            Declined
                          </span>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
