import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeamFinder() {
  const { 
    activeTeams, 
    requestToJoin, 
    setProjectModalOpen,
    hackathons,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const searchQuery = globalSearchQuery;
  const setSearchQuery = setGlobalSearchQuery;
  const [selectedHackathon, setSelectedHackathon] = useState('All');
  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleRoleFilter = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(prev => prev.filter(r => r !== role));
    } else {
      setSelectedRoles(prev => [...prev, role]);
    }
  };

  const clearFilters = () => {
    setSelectedHackathon('All');
    setSelectedRoles([]);
    setSearchQuery('');
  };

  const filteredTeams = activeTeams.filter(team => {
    const matchesSearch = searchQuery === '' || 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesHackathon = selectedHackathon === 'All' || 
      team.hackathon.toLowerCase().includes(selectedHackathon.toLowerCase()) ||
      selectedHackathon.toLowerCase().includes(team.hackathon.toLowerCase());

    const matchesRoles = selectedRoles.length === 0 || 
      team.rolesNeeded.some(role => selectedRoles.some(selRole => role.toLowerCase().includes(selRole.toLowerCase())));

    return matchesSearch && matchesHackathon && matchesRoles;
  });

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex font-sans text-slate-900">
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 lg:pl-64 min-w-0 pb-16">
        
        {/* Header Panel */}
        <header className="bg-white border-b-[3px] border-slate-900 sticky top-0 z-30 px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 capitalize uppercase">Explore</span>
            <span className="text-slate-400 font-bold">/</span>
            <span className="text-xs font-extrabold text-slate-900 uppercase">Team Finder</span>
          </div>

          <button
            onClick={() => setProjectModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3px]" />
            Create Team Post
          </button>
        </header>

        {/* Content Pane */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-8 space-y-8">
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">Find Your Next Adventure</h1>
              <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mt-1">Connect with active student teams looking for collaborators.</p>
            </div>
            
            <div className="flex gap-1.5">
              <button className="p-2 border-2 border-slate-900 bg-white hover:bg-slate-100 rounded-xl text-slate-900 transition-colors shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] cursor-pointer">
                <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
              </button>
              <button className="p-2 border-2 border-slate-900 bg-white hover:bg-slate-100 rounded-xl text-slate-900 transition-colors shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] cursor-pointer">
                <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
              </button>
            </div>
          </div>

          {/* Hackathons Quick Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hackathons.slice(0, 3).map((hack) => (
              <div 
                key={hack.id}
                onClick={() => setSelectedHackathon(selectedHackathon === hack.title ? 'All' : hack.title)}
                className={`cursor-pointer rounded-2xl p-5 border-2 border-slate-900 transition-all duration-200 flex flex-col justify-between h-32 ${
                  selectedHackathon === hack.title 
                    ? 'bg-amber-400 text-slate-900 shadow-[3px_3px_0px_#000]' 
                    : 'bg-white hover:bg-slate-50 shadow-[4px_4px_0px_#000]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${hack.iconBg} border border-slate-100/50`}>
                    {hack.title.split(' ').map(w => w[0]).join('')}
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 bg-white border border-slate-900 text-slate-900 rounded-full tracking-wide shadow-[1px_1px_0px_#000]">
                    Ends in {hack.endsIn}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase">{hack.title}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-blue-600 font-extrabold mt-1">
                    <span>Filter teams</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Filter & Grid Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Simple Filters Panel (Col 3) */}
            <div className="lg:col-span-3 space-y-4">
              
              <div className="bg-white rounded-2xl border-2 border-slate-900 p-5 shadow-[4px_4px_0px_#000] space-y-5">
                <div>
                  <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Filters</h3>
                </div>

                {/* Dropdown for Hackathons */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">Competition</label>
                  <select 
                    value={selectedHackathon}
                    onChange={(e) => setSelectedHackathon(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-white border-2 border-slate-900 rounded-xl px-3 py-2.5 shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-slate-50 transition-all cursor-pointer"
                  >
                    <option value="All">All Hackathons</option>
                    {hackathons.map(hack => (
                      <option key={hack.id} value={hack.title}>{hack.title}</option>
                    ))}
                  </select>
                </div>

                {/* Roles Needed Pill Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">Looking for</label>
                  
                  <div className="flex flex-col gap-2">
                    {['Frontend Developer', 'Backend Developer', 'UX Designer', 'Data Scientist'].map((role) => {
                      const isSelected = selectedRoles.includes(role);
                      return (
                        <button
                          key={role}
                          onClick={() => toggleRoleFilter(role)}
                          className={`text-left px-3 py-2 rounded-xl text-xs font-extrabold border-2 border-slate-900 shadow-[2px_2px_0px_#000] transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-amber-400 text-slate-900 shadow-[1px_1px_0px_#000]' 
                              : 'bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {role}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedHackathon !== 'All' || selectedRoles.length > 0 || searchQuery !== '') && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 bg-white border-2 border-slate-900 hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Start Your Own Team Card */}
              <div className="bg-blue-600 rounded-2xl p-5 text-white border-2 border-slate-900 shadow-[4px_4px_0px_#000] relative overflow-hidden">
                <h4 className="font-extrabold text-xs uppercase tracking-wide">Want to run your own team?</h4>
                <p className="text-[10px] text-blue-100 mt-2 leading-relaxed font-semibold">
                  Start your own project and invite builders to join your project.
                </p>
                <button
                  onClick={() => setProjectModalOpen(true)}
                  className="w-full mt-4 py-2 bg-white border-2 border-slate-900 hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-xl shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                >
                  Post Project
                </button>
              </div>

            </div>

            {/* Teams Posts List Area (Col 9) */}
            <div className="lg:col-span-9 space-y-4">
              
              {/* Search & Sort Panel */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-3 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#000]">
                {/* Search Bar Input */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search teams or technologies..."
                    className="w-full text-xs bg-white border-2 border-slate-900 rounded-xl pl-9 pr-4 py-2.5 shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-slate-50 transition-all text-slate-900 font-bold"
                  />
                </div>

                {/* Info Text */}
                <div className="flex justify-between sm:justify-end items-center gap-4 w-full sm:w-auto text-xs pl-2 text-slate-500 font-bold uppercase tracking-wider">
                  <span>
                    Showing <span className="text-slate-900 font-black">{filteredTeams.length}</span> active team posts
                  </span>
                </div>
              </div>

              {/* Active Teams Posts Stack */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredTeams.map((team, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15, delay: idx * 0.03 }}
                      key={team.id}
                      className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col md:flex-row justify-between gap-6 md:items-center"
                    >
                      {/* Left: Details */}
                      <div className="space-y-2.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-extrabold text-slate-900 uppercase">
                            {team.name}
                          </h3>
                          <span className="bg-white border border-slate-900 text-slate-900 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#000] uppercase tracking-wide">
                            {team.hackathon}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed max-w-xl font-medium">
                          {team.desc}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {team.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-amber-200 text-slate-900 border border-slate-900 shadow-[1px_1px_0px_#000] uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Join Button & Time */}
                      <div className="flex flex-col items-stretch md:items-end justify-between self-stretch shrink-0 md:border-l-2 md:border-slate-200 md:pl-6 min-w-[130px]">
                        <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mb-3 md:mb-0 justify-end uppercase tracking-wide">
                          <Clock className="w-3.5 h-3.5 text-slate-400 stroke-[2.5px]" />
                          {team.posted}
                        </span>

                        <button
                          onClick={() => requestToJoin(team.id)}
                          className={`px-4 py-2 text-xs font-extrabold rounded-xl border-2 border-slate-900 transition-all cursor-pointer ${
                            team.requested 
                              ? 'bg-slate-100 border-slate-900/50 text-slate-400 cursor-default shadow-none flex items-center justify-center gap-1' 
                              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]'
                          }`}
                        >
                          {team.requested ? 'Request Sent' : 'Join Team'}
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {filteredTeams.length === 0 && (
                    <motion.div 
                      className="bg-white border-2 border-slate-900 rounded-2xl p-10 text-center shadow-[4px_4px_0px_#000]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                      <h4 className="font-extrabold text-slate-800 text-xs uppercase">No active teams found</h4>
                      <p className="text-slate-500 text-[11px] mt-1 max-w-xs mx-auto leading-relaxed font-semibold uppercase">
                        Try clearing filters or search terms to see available opportunities.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
