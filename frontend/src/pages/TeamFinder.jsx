import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeamFinder() {
  const {
    hackathons,
    setProjectModalOpen,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const searchQuery = globalSearchQuery;
  const visibleHackathons = hackathons.filter((hack) =>
    searchQuery === '' ||
    [hack.title, hack.description, hack.category, hack.status]
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-10">
          <section className="space-y-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-red-400 font-black">Hackathon Arena</p>
                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight">Bold events for builders</h1>
                <p className="max-w-2xl text-sm text-slate-300 font-medium leading-relaxed">
                  Explore the latest hackathons with premium energy, fast-moving prize pools and teams ready to ship.
                </p>
              </div>

              <button
                onClick={() => setProjectModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border-2 border-white bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[10px_10px_0px_#000] transition hover:bg-red-500 active:translate-x-[2px] active:translate-y-[2px]"
              >
                <Plus className="w-4 h-4 stroke-[3px]" />
                Create Team
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.8fr_1fr]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  placeholder="Search hackathons, categories, teams..."
                  className="w-full rounded-[2rem] border-2 border-white bg-slate-950/60 px-12 py-3 text-sm font-bold text-white outline-none transition focus:border-red-500"
                />
              </div>
              <div className="rounded-[2rem] border-2 border-white bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-200 flex items-center justify-between">
                <span>{visibleHackathons.length} events</span>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            {visibleHackathons.map((hack) => (
              <motion.div
                key={hack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="card"
                style={{
                  '--primary': '#000000',
                  '--secondary': '#ff0000',
                  '--secondary-hover': '#cc0000',
                  '--accent': '#ff0000',
                  '--text': '#000000',
                  '--bg': '#ffffff',
                  '--shadow-color': '#000000',
                  '--pattern-color': '#d9d9d9'
                }}
              >
                <div className="card-pattern-grid" />
                <div className="card-overlay-dots" />

                <div className="bold-pattern">
                  <svg viewBox="0 0 100 100">
                    <path
                      strokeDasharray="15 10"
                      strokeWidth="10"
                      stroke="#000"
                      fill="none"
                      d="M0,0 L100,0 L100,100 L0,100 Z"
                    />
                  </svg>
                </div>

                <div className="card-title-area">
                  <span>{hack.title}</span>
                  <span className="card-tag">{hack.status.toUpperCase()}</span>
                </div>

                <div className="card-body">
                  <div className="card-description">{hack.description}</div>

                  <div className="feature-grid">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <svg viewBox="0 0 24 24">
                          <path d="M20,4C21.1,4 22,4.9 22,6V18C22,19.1 21.1,20 20,20H4C2.9,20 2,19.1 2,18V6C2,4.9 2.9,4 4,4H20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z" />
                        </svg>
                      </div>
                      <span className="feature-text">UI/UX Design</span>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <svg viewBox="0 0 24 24">
                          <path d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z" />
                        </svg>
                      </div>
                      <span className="feature-text">Development</span>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <svg viewBox="0 0 24 24">
                          <path d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
                        </svg>
                      </div>
                      <span className="feature-text">Brand Identity</span>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <svg viewBox="0 0 24 24">
                          <path d="M9.19,6.35C8.41,7.13 7.75,8.05 7.25,9H5V11H7.12C7.05,11.32 7,11.66 7,12C7,12.34 7.05,12.68 7.12,13H5V15H7.25C7.75,15.95 8.41,16.87 9.19,17.65L7.77,19.07L9.88,21.18L11.3,19.77C11.85,20.03 12.41,20.2 13,20.31V23H15V20.31C15.59,20.2 16.15,20.03 16.7,19.77L18.12,21.18L20.23,19.07L18.81,17.65C19.59,16.87 20.25,15.95 20.75,15H23V13H20.88C20.95,12.68 21,12.34 21,12C21,11.66 20.95,11.32 20.88,11H23V9H20.75C20.25,8.05 19.59,7.13 18.81,6.35L20.23,4.93L18.12,2.82L16.7,4.23C16.15,3.97 15.59,3.8 15,3.69V1H13V3.69C12.41,3.8 11.85,3.97 11.3,4.23L9.88,2.82L7.77,4.93L9.19,6.35M13,17A5,5 0 0,1 8,12A5,5 0 0,1 13,7A5,5 0 0,1 18,12A5,5 0 0,1 13,17Z" />
                        </svg>
                      </div>
                      <span className="feature-text">Marketing</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <div className="price">
                      <span className="price-currency">$</span>{hack.prizeAmount}
                      <span className="price-period">per project</span>
                    </div>
                    <button className="card-button">Join Now</button>
                  </div>
                </div>

                <div className="dots-pattern">
                  <svg viewBox="0 0 80 40">
                    <circle fill="#000" r="3" cy="10" cx="10" />
                    <circle fill="#000" r="3" cy="10" cx="30" />
                    <circle fill="#000" r="3" cy="10" cx="50" />
                    <circle fill="#000" r="3" cy="10" cx="70" />
                    <circle fill="#000" r="3" cy="20" cx="20" />
                    <circle fill="#000" r="3" cy="20" cx="40" />
                    <circle fill="#000" r="3" cy="20" cx="60" />
                    <circle fill="#000" r="3" cy="30" cx="10" />
                    <circle fill="#000" r="3" cy="30" cx="30" />
                    <circle fill="#000" r="3" cy="30" cx="50" />
                    <circle fill="#000" r="3" cy="30" cx="70" />
                  </svg>
                </div>

                <div className="accent-shape" />
                <div className="corner-slice" />
                <div className="stamp">
                  <span className="stamp-text">Live</span>
                </div>
              </motion.div>
            ))}
          </section>

          {visibleHackathons.length === 0 && (
            <div className="rounded-[2rem] border-2 border-red-500 bg-white/5 p-10 text-center text-sm font-black uppercase tracking-[0.18em] text-slate-300">
              No hackathons matched your search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
