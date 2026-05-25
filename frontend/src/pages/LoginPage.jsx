import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, AlertCircle, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, setCurrentRoute } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSandbox, setIsSandbox] = useState(true); // default to sandbox mode for seamless local testing

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(email, password, isSandbox);
    setLoading(false);
    
    if (!result.success) {
      setError(result.error);
    }
  };

  // Pre-fill credentials if Sandbox Mode is selected
  const handleSandboxToggle = (e) => {
    const checked = e.target.checked;
    setIsSandbox(checked);
    if (checked) {
      setEmail('alex@stanford.edu');
      setPassword('password123');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  // Initialize with sandbox credentials if it is turned on
  React.useEffect(() => {
    if (isSandbox) {
      setEmail('alex@stanford.edu');
      setPassword('password123');
    }
  }, [isSandbox]);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Visual background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/40 blur-3xl pointer-events-none" />

      {/* Back link */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => setCurrentRoute('landing')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-semibold px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ColabSpace</span>
        </h2>
        <p className="mt-2 text-center text-xs text-slate-500">
          Secure student developer collaboration portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <motion.div 
          className="bg-white border border-slate-200/80 py-8 px-4 sm:px-10 shadow-premium rounded-3xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Sandbox alert notification */}
          {isSandbox ? (
            <div className="mb-6 p-3.5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 text-xs text-blue-700">
              <Sparkles className="w-4 h-4 shrink-0 text-blue-600 animate-pulse mt-0.5" />
              <div>
                <span className="font-bold text-blue-800 block">Sandbox Mode Activated</span>
                Testing local UI flows. The authentication endpoints will be bypassed with mock data.
              </div>
            </div>
          ) : (
            <div className="mb-6 p-3.5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-xs text-amber-700">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <span className="font-bold text-amber-800 block">Connecting to Live Server</span>
                Endpoint: <code className="bg-amber-100 px-1 py-0.5 rounded text-[10px]">api.plus.in</code>. Requires cookies & HTTPS support.
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isSandbox}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-75 disabled:text-slate-500 font-medium"
                  placeholder="alex@stanford.edu"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isSandbox}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-75 disabled:text-slate-500 font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Sandbox Mode Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSandbox}
                  onChange={handleSandboxToggle}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-600">Run Sandbox / Demo mode</span>
              </label>

              <div className="text-xs">
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footnotes */}
          <div className="mt-8 text-center text-xs">
            <span className="text-slate-500">New to ColabSpace? </span>
            <button
              onClick={() => setCurrentRoute('signup')}
              className="font-bold text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
            >
              Create an account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
