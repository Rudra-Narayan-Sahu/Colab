import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../components/FlipAuth.css';

export default function AuthFlipPage() {
  const { login, signup, setCurrentRoute, currentRoute } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSandbox, setIsSandbox] = useState(true);

  // Login fields
  const [loginEmail, setLoginEmail] = useState('alex@stanford.edu');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Signup fields
  const [signupName, setSignupName] = useState('Alex Rivera');
  const [signupEmail, setSignupEmail] = useState('alex@stanford.edu');
  const [signupPassword, setSignupPassword] = useState('password123');

  const handleSandboxToggle = (checked) => {
    setIsSandbox(checked);
    if (checked) {
      setLoginEmail('alex@stanford.edu');
      setLoginPassword('password123');
      setSignupName('Alex Rivera');
      setSignupEmail('alex@stanford.edu');
      setSignupPassword('password123');
    } else {
      setLoginEmail('');
      setLoginPassword('');
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsLoading(true);
    const result = await login(loginEmail, loginPassword, isSandbox);
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsLoading(true);
    const result = await signup(
      { name: signupName, email: signupEmail, password: signupPassword, role: 'Frontend Developer' },
      isSandbox
    );
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
    }
  };

  // If route is 'signup', start with the toggle checked (showing signup side)
  const defaultChecked = currentRoute === 'signup';

  return (
    <div className="flip-auth-wrapper">
      {/* Back button */}
      <button className="flip-auth-back" onClick={() => setCurrentRoute('landing')}>
        ← Back
      </button>

      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" defaultChecked={defaultChecked} />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            {/* ======== LOGIN SIDE ======== */}
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" onSubmit={handleLogin}>
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={isSandbox}
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  disabled={isSandbox}
                  required
                />
                <label className="flip-auth-sandbox">
                  <input
                    type="checkbox"
                    checked={isSandbox}
                    onChange={(e) => handleSandboxToggle(e.target.checked)}
                  />
                  Sandbox / Demo mode
                </label>
                {error && <div className="flip-auth-error">{error}</div>}
                <button className="flip-card__btn" type="submit" disabled={isLoading}>
                  {isLoading ? '...' : "Let's go!"}
                </button>
              </form>
            </div>

            {/* ======== SIGNUP SIDE ======== */}
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form" onSubmit={handleSignup}>
                <input
                  className="flip-card__input"
                  placeholder="Name"
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  disabled={isSandbox}
                  required
                />
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  disabled={isSandbox}
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  disabled={isSandbox}
                  required
                />
                <label className="flip-auth-sandbox">
                  <input
                    type="checkbox"
                    checked={isSandbox}
                    onChange={(e) => handleSandboxToggle(e.target.checked)}
                  />
                  Sandbox / Demo mode
                </label>
                {error && <div className="flip-auth-error">{error}</div>}
                <button className="flip-card__btn" type="submit" disabled={isLoading}>
                  {isLoading ? '...' : 'Confirm!'}
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
