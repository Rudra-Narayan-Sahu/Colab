import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import { 
  Link2, 
  Share2, 
  Code2, 
  Rocket, 
  Star, 
  MessageSquare, 
  Users2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { currentUser } = useApp();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex font-sans text-slate-900">
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 lg:pl-64 min-w-0 pb-16">
        
        {/* Top Header Panel */}
        <header className="bg-white border-b-[3px] border-slate-900 sticky top-0 z-30 px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 capitalize uppercase">Profile</span>
            <span className="text-slate-400 font-bold">/</span>
            <span className="text-xs font-extrabold text-slate-800 uppercase">{currentUser.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-xl border-2 border-slate-900 bg-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer">
              <Share2 className="w-3.5 h-3.5 text-slate-900 stroke-[2.5px]" />
            </button>
            <button 
              onClick={() => setIsConnected(!isConnected)}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer ${
                isConnected 
                  ? 'bg-slate-150 text-slate-500 shadow-none translate-x-[2px] translate-y-[2px]' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isConnected ? 'Connected' : 'Connect'}
            </button>
          </div>
        </header>

        {/* Content Panel */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-8 space-y-8">
          
          {/* Cover & Avatar Header Block */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-[6px_6px_0px_#000]">
            {/* Clean Solid Cover */}
            <div className="h-36 sm:h-44 bg-blue-600 border-b-2 border-slate-900 relative" />

            {/* Avatar & Info overlap wrapper */}
            <div className="px-6 sm:px-8 pb-8 relative">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 sm:-mt-16 gap-4 mb-6">
                <div className="relative inline-block">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-slate-900 shadow-[4px_4px_0px_#000] bg-slate-100"
                  />
                  <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-sm" />
                </div>

                {/* Score badge & site link */}
                <div className="flex items-center gap-3 self-start sm:self-auto sm:pb-2">
                  <div className="bg-emerald-400 border-2 border-slate-900 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 stroke-[2.5px]" />
                    <div>
                      <span className="text-xs font-black text-slate-900 block leading-none">{currentUser.reliability}%</span>
                      <span className="text-[9px] font-extrabold text-slate-800 uppercase tracking-wider mt-0.5 block">Reliability</span>
                    </div>
                  </div>

                  <a href="#" className="p-2.5 border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-950 rounded-xl transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]">
                    <Link2 className="w-4 h-4 stroke-[2.5px]" />
                  </a>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-2 max-w-2xl">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">{currentUser.name}</h2>
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">{currentUser.title} at Stanford University</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-1">
                  {currentUser.bio}
                </p>
              </div>

            </div>
          </div>

          {/* Grid Layout: Profile details & feedback sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main (Col 8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Technical Stack */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-100">
                  <Code2 className="w-4.5 h-4.5 text-slate-900 stroke-[2.5px]" />
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight uppercase">Technical Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-white border-2 border-slate-900 rounded-xl px-3 py-1.5 text-xs font-extrabold text-slate-900 shadow-[2px_2px_0px_#000]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Completed Projects Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4.5 h-4.5 text-slate-900 stroke-[2.5px]" />
                    <h3 className="font-extrabold text-slate-900 text-sm tracking-tight uppercase">Completed Projects</h3>
                  </div>
                  <a href="#" className="text-xs font-extrabold text-blue-600 hover:text-blue-700 hover:underline uppercase tracking-wide">
                    View All
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.completedProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div className="relative h-36 overflow-hidden bg-slate-100 border-b-2 border-slate-900">
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors uppercase">
                            {proj.title}
                          </h4>
                          <p className="text-slate-600 text-xs mt-1 leading-relaxed font-medium">
                            {proj.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-200 pt-3 mt-auto">
                          <div className="flex -space-x-1">
                            <img className="w-5 h-5 rounded-full border border-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60" alt="avatar" />
                            <img className="w-5 h-5 rounded-full border border-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60" alt="avatar" />
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            {proj.contributors} contributors
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Panel (Col 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Peer Reviews */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-[5px_5px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-100">
                  <MessageSquare className="w-4 h-4 text-slate-900 stroke-[2.5px]" />
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Reviews</h3>
                </div>

                <div className="space-y-4">
                  {currentUser.reviews.map((rev) => (
                    <div key={rev.id} className="space-y-1.5 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800 uppercase">{rev.author}</span>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 italic leading-relaxed font-medium">
                        "{rev.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Teams */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-[5px_5px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-100">
                  <Users2 className="w-4 h-4 text-slate-900 stroke-[2.5px]" />
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Current Teams</h3>
                </div>

                <div className="space-y-3">
                  {currentUser.teams.map((team) => (
                    <div 
                      key={team.id}
                      className="flex items-center justify-between p-3 bg-white border-2 border-slate-900 rounded-xl group cursor-pointer shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-slate-900 border border-slate-900 shadow-[1px_1px_0px_#000] rounded-lg flex items-center justify-center font-extrabold text-xs">
                          {team.initial}
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-800 leading-none group-hover:text-blue-600 transition-colors uppercase">
                            {team.name}
                          </h4>
                          <span className="text-[9px] text-slate-500 font-bold block mt-1.5 uppercase tracking-wide">{team.role} • {team.members} members</span>
                        </div>
                      </div>
                      
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform stroke-[2.5px]" />
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
