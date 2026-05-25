import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import TeamFinder from './pages/TeamFinder';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import ProjectModal from './components/ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const { currentRoute, setCurrentRoute, currentUser, authLoading, init } = useApp();

  // Run session check on mount
  useEffect(() => {
    init();
  }, []);

  // Protected route and public route guard
  useEffect(() => {
    const protectedRoutes = ['dashboard', 'explore', 'profile'];
    const authRoutes = ['login', 'signup'];

    if (!authLoading) {
      if (!currentUser && protectedRoutes.includes(currentRoute)) {
        console.log(`Guard: Route '${currentRoute}' requires login. Redirecting...`);
        setCurrentRoute('login');
      } else if (currentUser && authRoutes.includes(currentRoute)) {
        console.log(`Guard: User already authenticated. Redirecting to dashboard...`);
        setCurrentRoute('dashboard');
      }
    }
  }, [currentRoute, currentUser, authLoading]);

  // Page switcher
  const renderRoute = () => {
    const protectedRoutes = ['dashboard', 'explore', 'profile'];
    if (protectedRoutes.includes(currentRoute) && !currentUser) {
      return (
        <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
          <span className="text-slate-500 text-xs font-extrabold uppercase tracking-widest animate-pulse">Verifying credentials...</span>
        </div>
      );
    }

    switch (currentRoute) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'explore':
        return <TeamFinder />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <LandingPage />;
    }
  };

  // Neo-Brutalist loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center font-sans">
        {/* Loading Card */}
        <div className="bg-white border-2 border-slate-900 p-8 rounded-3xl shadow-[8px_8px_0px_#000] flex flex-col items-center gap-6 min-w-[260px]">
          {/* Spinner */}
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
              Colab<span className="text-blue-600">Hub</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest animate-pulse">
              Securing session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Animation Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoute}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {renderRoute()}
        </motion.div>
      </AnimatePresence>

      {/* Global Project creation modal */}
      <ProjectModal />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
