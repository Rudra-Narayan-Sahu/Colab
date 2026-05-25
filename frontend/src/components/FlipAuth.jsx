import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../components/FlipAuth.css';

export default function FlipAuth() {
  const { login, signup, setCurrentRoute } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(loginEmail, loginPassword, false);
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
    } else {
      // navigate after successful login
      setCurrentRoute('dashboard');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await signup({ name: signupName, email: signupEmail, password: signupPassword, role: 'Frontend Developer' }, false);
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
    } else {
      setCurrentRoute('dashboard');
    }
  };

  const handleBack = () => {
    setCurrentRoute('landing');
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            {/* Login Side */}
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
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                {error && (
                  <div className="error-msg" style={{ color: 'red', marginTop: '8px' }}>{error}</div>
                )}
                <button className="flip-card__btn" type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : "Let's go!"}
                </button>
                <button type="button" onClick={handleBack} className="flip-card__btn" style={{ marginTop: '8px' }}>
                  Back
                </button>
              </form>
            </div>
            {/* Signup Side */}
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form" onSubmit={handleSignup}>
                <input
                  className="flip-card__input"
                  placeholder="Name"
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                {error && (
                  <div className="error-msg" style={{ color: 'red', marginTop: '8px' }}>{error}</div>
                )}
                <button className="flip-card__btn" type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Confirm!'}
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
