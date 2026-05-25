import React from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import HackathonCard from '../components/HackathonCard';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Trophy, 
  Heart, 
  ChevronRight, 
  Sparkles,
  Users,
  Flame,
  Plus,
  Zap,
  Star
} from 'lucide-react';
import heroImage from '../assets/hero.png';

export default function LandingPage() {
  const { 
    setCurrentRoute, 
    hackathons, 
    activeTeams, 
    setProjectModalOpen,
    currentUser
  } = useApp();

  const stagger = {
    animate: { transition: { staggerChildren: 0.08 } }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col font-sans text-slate-900">
      <Navbar />

      {/* ─── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Content */}
            <motion.div
              className="lg:col-span-6 space-y-8 text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 border-2 border-slate-900 rounded-full shadow-[3px_3px_0px_#000] text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.5px]" />
                  Join 20k+ Student Builders
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95] uppercase"
                variants={fadeInUp}
              >
                Find Your<br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-blue-600">Perfect</span>
                </span>
                <br />Team.
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium border-l-4 border-slate-900 pl-4"
                variants={fadeInUp}
              >
                Connect with like-minded students, join ambitious hackathon projects, and build real-world experience together. ColabSpace is where the next generation of founders starts.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={fadeInUp}
              >
                <button
                  onClick={() => setCurrentRoute('explore')}
                  className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-wide rounded-2xl border-2 border-slate-900 shadow-[5px_5px_0px_#000] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  Find Team
                  <ArrowRight className="w-4 h-4 stroke-[3px] transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => {
                    if (!currentUser) {
                      setCurrentRoute('login');
                    } else {
                      setCurrentRoute('dashboard');
                      setProjectModalOpen(true);
                    }
                  }}
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-extrabold uppercase tracking-wide rounded-2xl border-2 border-slate-900 shadow-[5px_5px_0px_#000] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3px]" />
                  Post Project
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div variants={fadeInUp} className="flex gap-6 justify-center lg:justify-start pt-2">
                {[
                  { val: '20k+', label: 'Students' },
                  { val: '4.2k', label: 'Projects' },
                  { val: '98%', label: 'Success rate' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="text-2xl font-black text-slate-900 block leading-none">{stat.val}</span>
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mt-1">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Hero Image */}
            <motion.div
              className="lg:col-span-6 relative flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full max-w-[500px] lg:max-w-none">
                {/* Decorative offset block */}
                <div className="absolute inset-0 translate-x-[10px] translate-y-[10px] bg-amber-400 border-2 border-slate-900 rounded-3xl" />
                {/* Image container */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-slate-900 bg-white shadow-none">
                  <img
                    src={heroImage}
                    alt="Student collaboration"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── TRUSTED UNIVERSITIES ───────────────────────────────── */}
      <section className="py-10 bg-white border-y-[3px] border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-7">
            Trusted by students from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {['STANFORD', 'MIT', 'Berkeley', 'HARVARD', 'YALE'].map((uni, i) => (
              <span
                key={uni}
                className="font-black text-slate-700 text-lg tracking-tight px-4 py-1.5 bg-white border-2 border-slate-900 rounded-xl shadow-[3px_3px_0px_#000] hover:bg-amber-400 transition-colors cursor-default"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED HACKATHONS ────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-slate-900 rounded-lg shadow-[2px_2px_0px_#000] text-[9px] font-extrabold uppercase tracking-widest text-slate-700 mb-4">
                <Trophy className="w-3 h-3 stroke-[2.5px]" />
                Featured
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter uppercase">
                Featured Hackathons
              </h2>
              <p className="text-slate-600 text-sm font-bold mt-2">
                Active competitions waiting for your expertise.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('explore')}
              className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 uppercase tracking-wide border-2 border-slate-900 bg-white hover:bg-amber-400 px-4 py-2 rounded-xl shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
            >
              View all
              <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hackathons.slice(0, 3).map((hack, index) => (
              <motion.div
                key={hack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full flex"
              >
                <HackathonCard hack={hack} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRENDING PROJECTS ──────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white border-t-[3px] border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0f0f0] border-2 border-slate-900 rounded-lg shadow-[2px_2px_0px_#000] text-[9px] font-extrabold uppercase tracking-widest text-slate-700 mb-4">
              <Flame className="w-3 h-3 stroke-[2.5px]" />
              Hot Right Now
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Trending Projects
            </h2>
            <p className="text-slate-600 text-sm font-bold mt-2 max-w-lg mx-auto">
              Join high-potential teams or get inspired for your next build.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Major Highlight Card */}
            <motion.div
              className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-8 border-2 border-slate-900 shadow-[8px_8px_0px_#1e293b] flex flex-col justify-between group relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
                  backgroundSize: '20px 20px'
                }}
              />

              <div className="relative z-10">
                <div className="flex gap-2 mb-6">
                  <span className="bg-white/15 text-white/90 border border-white/30 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-[2px_2px_0px_rgba(255,255,255,0.1)]">
                    BLOCKCHAIN
                  </span>
                  <span className="bg-amber-400 text-slate-900 border border-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                    NEXT.JS
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-white uppercase group-hover:text-amber-400 transition-colors">
                  Ethos: Decentralized Identity
                </h3>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl font-medium border-l-2 border-white/20 pl-3">
                  Building a secure, user-owned identity layer for the open web. We're looking for Rust developers and UI designers with a focus on accessibility.
                </p>
              </div>

              <div className="relative z-10 mt-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-lg border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80" alt="avatar" />
                    <img className="w-8 h-8 rounded-lg border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80" alt="avatar" />
                    <img className="w-8 h-8 rounded-lg border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80" alt="avatar" />
                  </div>
                  <span className="text-white/70 text-xs font-extrabold uppercase tracking-wide bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">+2 members</span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-white/60 hover:text-rose-400 transition-colors text-xs font-bold uppercase">
                    <Heart className="w-4 h-4 fill-current stroke-[2.5px]" />
                    1.2k
                  </button>
                  <button
                    onClick={() => setCurrentRoute('explore')}
                    className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 border-2 border-slate-900 text-xs font-extrabold uppercase tracking-wide rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.4)] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.4)] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                  >
                    Apply to join
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Side Grid Stack */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {[
                {
                  title: 'FocusFlow',
                  tag: 'PRODUCTIVITY',
                  desc: 'Gamified productivity app for students using neural research.',
                  members: '4 members',
                  likes: '438',
                  tagColor: 'bg-blue-100 text-slate-900 border-blue-300'
                },
                {
                  title: 'PaperMind',
                  tag: 'AI/ML',
                  desc: 'AI-driven literature review and research synthesis tool.',
                  members: '3 members',
                  likes: '892',
                  tagColor: 'bg-emerald-100 text-slate-900 border-emerald-300'
                }
              ].map((proj, index) => (
                <motion.div
                  key={proj.title}
                  className="bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  onClick={() => setCurrentRoute('explore')}
                >
                  <div>
                    <span className={`inline-block ${proj.tagColor} border-2 text-[9px] font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-wider mb-3 shadow-[1px_1px_0px_#000]`}>
                      {proj.tag}
                    </span>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase">
                      {proj.title}
                    </h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed font-medium">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                      <Users className="w-3.5 h-3.5 stroke-[2.5px]" />
                      {proj.members}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 flex items-center gap-1 font-bold">
                        <Flame className="w-3.5 h-3.5 text-orange-500 fill-current" />
                        {proj.likes}
                      </span>
                      <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wide border-b-2 border-blue-600">
                        Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────── */}
      <section className="py-16 bg-[#f0f0f0] border-t-[3px] border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-blue-600 rounded-3xl p-10 sm:p-16 text-center text-white border-2 border-slate-900 shadow-[10px_10px_0px_#000] relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Decorative offset block */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-amber-400 border-2 border-slate-900 rounded-2xl opacity-60 rotate-12" />
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-white border-2 border-slate-900 rounded-xl opacity-40 -rotate-6" />

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-slate-900 rounded-full shadow-[3px_3px_0px_#000] text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-2">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
                Get started free
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-none">
                Ready to build<br />something incredible?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium max-w-lg mx-auto">
                Join thousands of students already launching projects and hackathon teams on ColabSpace.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={() => setCurrentRoute('signup')}
                  className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold uppercase tracking-wide text-sm rounded-2xl border-2 border-slate-900 shadow-[5px_5px_0px_#000] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                >
                  Create Free Account
                </button>
                <button
                  onClick={() => setCurrentRoute('explore')}
                  className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-extrabold uppercase tracking-wide text-sm rounded-2xl border-2 border-slate-900 shadow-[5px_5px_0px_#000] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
                >
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-slate-900 border-t-[3px] border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-3">
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <div className="w-8 h-8 bg-white border-2 border-white/30 rounded-xl flex items-center justify-center shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
                <span className="text-slate-900 text-sm font-black">C</span>
              </div>
              <span className="text-lg font-black text-white uppercase tracking-tight">
                Colab<span className="text-amber-400">Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              © {new Date().getFullYear()} ColabSpace. Built for the next generation of builders.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {['Terms', 'Privacy', 'Twitter', 'GitHub'].map((link) => (
              <a
                key={link}
                href="#"
                className="px-4 py-2 bg-white/10 border border-white/20 hover:bg-amber-400 hover:text-slate-900 hover:border-slate-900 text-white text-xs font-extrabold uppercase tracking-wide rounded-xl transition-all"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
