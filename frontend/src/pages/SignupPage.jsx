import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function SignupPage() {
  const { signup, setCurrentRoute } = useApp();
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@stanford.edu');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [role, setRole] = useState('Frontend Developer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSandbox, setIsSandbox] = useState(true);

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

  const handleSandboxToggle = (event) => {
    const checked = event.target.checked;
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

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10 font-sans">
      <button
        onClick={() => setCurrentRoute('landing')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-[6px_6px_0px_#000] transition hover:bg-slate-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl rounded-3xl border-2 border-slate-900 bg-slate-200 p-8 shadow-[10px_10px_0px_#000]"
      >
        <div className="flex items-center justify-between mb-6">
          <button type="button" className="text-base font-black underline underline-offset-4 text-slate-900">
            Sign up
          </button>
          <button
            type="button"
            onClick={() => setCurrentRoute('login')}
            className="flex items-center gap-3 rounded-2xl border-2 border-slate-900 bg-white px-3 py-2 text-sm font-semibold text-slate-900"
          >
            <span>□</span>
            <span>Log in</span>
          </button>
        </div>

        <h1 className="mb-8 text-center text-3xl font-black uppercase tracking-tight text-slate-900">Create account</h1>

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-2xl border border-rose-600 bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-800">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-slate-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSandbox}
                className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                placeholder="Alex Rivera"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSandbox}
                className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                placeholder="alex@stanford.edu"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSandbox}
                className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                placeholder="••••••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-slate-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSandbox}
                className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-slate-700">
              Primary developer role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r} className="bg-white text-slate-900">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold text-slate-900">
            <input
              type="checkbox"
              checked={isSandbox}
              onChange={handleSandboxToggle}
              className="h-4 w-4 rounded border-slate-900 text-slate-900 focus:ring-slate-900"
            />
            Sandbox / Demo mode
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-900 shadow-[6px_6px_0px_#000] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
