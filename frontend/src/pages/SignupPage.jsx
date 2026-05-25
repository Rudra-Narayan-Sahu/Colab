import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, AlertCircle, Sparkles, ShieldAlert, ArrowRight, User, Terminal } from 'lucide-react';

export default function SignupPage() {
  const { signup, setCurrentRoute } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Frontend Developer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSandbox, setIsSandbox] = useState(true); // default to sandbox mode for seamless local testing

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
    'Data Scientist',
    'Mobile Developer'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    const result = await signup({ name, email, password, role }, isSandbox);
    setLoading(false);
    
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleSandboxToggle = (e) => {
    const checked = e.target.checked;
    setIsSandbox(checked);
    if (checked) {
      setName('Alex Rivera');
      setEmail('alex@stanford.edu');
      setPassword('password123');
      setConfirmPassword('password123');
      setRole('Frontend Developer');
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  React.useEffect(() => {
    if (isSandbox) {
      setName('Alex Rivera');
      setEmail('alex@stanford.edu');
      setPassword('password123');
      setConfirmPassword('password123');
      setRole('Frontend Developer');
    }
  }, [isSandbox]);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/40 blur-3xl pointer-events-none" />

      {/* Back button */}
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
          Join <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ColabSpace</span>
        </h2>
        <p className="mt-2 text-center text-xs text-slate-500">
          Find your perfect hackathon collaborators
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10 px-4">
        <motion.div 
          className="bg-white border border-slate-200/80 py-8 px-4 sm:px-10 shadow-premium rounded-3xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Sandbox warning */}
          {isSandbox ? (
            <div className="mb-6 p-3.5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 text-xs text-blue-700">
              <Sparkles className="w-4 h-4 shrink-0 text-blue-600 animate-pulse mt-0.5" />
              <div>
                <span className="font-bold text-blue-800 block">Sandbox Mode Activated</span>
                Instantly registers your profile using local mock credentials. Bypasses live endpoints.
              </div>
            </div>
          ) : (
            <div className="mb-6 p-3.5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-xs text-amber-700">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <span className="font-bold text-amber-800 block">Connecting to Live Server</span>
                Endpoint: <code className="bg-amber-100 px-1 py-0.5 rounded text-[10px]">api.plus.in</code>. Requires valid credentials.
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Grid for Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isSandbox}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-75 disabled:text-slate-500 font-medium"
                    placeholder="Alex Rivera"
                  />
                </div>
              </div>

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
            </div>

            {/* Grid for Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pass" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    id="pass"
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

              <div>
                <label htmlFor="confirm" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    id="confirm"
                    name="confirmPassword"
                    type="password"
                    required
                    disabled={isSandbox}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-75 disabled:text-slate-500 font-medium"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Role Selection Dropdown */}
            <div>
              <label htmlFor="role" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Primary Developer Role
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Terminal className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all font-medium cursor-pointer"
                >
                  {roles.map((r) => (
                    <option key={r} value={r} className="bg-white text-slate-800">
                      {r}
                    </option>
                  ))}
                </select>
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
                    Sign Up
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footnotes */}
          <div className="mt-8 text-center text-xs">
            <span className="text-slate-500">Already have an account? </span>
            <button
              onClick={() => setCurrentRoute('login')}
              className="font-bold text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
