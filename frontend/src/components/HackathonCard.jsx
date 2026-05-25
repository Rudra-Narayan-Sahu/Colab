import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Trophy, Clock, Code2, ArrowRight } from 'lucide-react';

export default function HackathonCard({ hack }) {
  const { setCurrentRoute } = useApp();

  const statusColors = {
    active:   { bg: 'bg-emerald-400', text: 'text-slate-900', border: 'border-slate-900' },
    closing:  { bg: 'bg-amber-400',   text: 'text-slate-900', border: 'border-slate-900' },
    upcoming: { bg: 'bg-blue-500',    text: 'text-white',     border: 'border-slate-900' },
  };

  const rawStatus = hack.status?.toLowerCase() || '';
  const statusKey = rawStatus.includes('active') ? 'active'
    : rawStatus.includes('ends') || rawStatus.includes('clos') ? 'closing'
    : 'upcoming';

  const sc = statusColors[statusKey];
  const statusLabel = statusKey === 'active' ? 'ACTIVE' : statusKey === 'closing' ? 'CLOSING' : 'UPCOMING';

  // Card accent color from hack data or fallback
  const accentBg = hack.colors?.primary
    ? { backgroundColor: hack.colors.primary }
    : { backgroundColor: '#2563eb' };

  return (
    <div className="group relative w-full flex flex-col bg-white border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden">

      {/* Colored Header Strip */}
      <div
        className="h-24 w-full relative overflow-hidden flex-shrink-0 border-b-2 border-slate-900"
        style={accentBg}
      >
        {/* Dot grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-2.5 py-1 ${sc.bg} ${sc.border} border-2 rounded-lg text-[9px] font-extrabold tracking-widest uppercase shadow-[2px_2px_0px_#000] ${sc.text}`}>
          {statusLabel}
        </div>

        {/* Prize Amount - big display */}
        <div className="absolute bottom-3 left-4">
          <span className="text-white/30 text-[10px] font-extrabold uppercase tracking-widest block">Prize Pool</span>
          <span className="text-white font-black text-2xl leading-none drop-shadow-md">${hack.prizeAmount}</span>
          <span className="text-white/70 text-[10px] font-bold ml-1">{hack.prizeLabel}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col p-5 gap-4">

        {/* Title */}
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
            {hack.title}
          </h3>
          <p className="text-slate-500 text-xs mt-1.5 font-medium leading-relaxed line-clamp-2">
            {hack.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Calendar, label: hack.date },
            { icon: Trophy,   label: hack.prize },
            { icon: Clock,    label: `Ends in ${hack.endsIn}` },
            { icon: Code2,    label: hack.category },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5"
            >
              <Icon className="w-3 h-3 text-slate-500 shrink-0 stroke-[2.5px]" />
              <span className="text-[10px] text-slate-700 font-bold truncate">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2 border-t-2 border-slate-100">
          <button
            onClick={() => setCurrentRoute('explore')}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wide rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#64748b] hover:shadow-[1px_1px_0px_#64748b] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            Join Now
            <ArrowRight className="w-3.5 h-3.5 stroke-[3px] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
