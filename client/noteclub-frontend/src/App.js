import React, { useState, useEffect } from 'react';
import { Chrome, GitBranch } from 'lucide-react';
import './App.css';
import Register from './Pages/register';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showRegister, setShowRegister] = useState(false); // Tracks whether to show register page

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    setShowRegister(true);
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    setShowRegister(false);
  };

  if (showRegister) {
    return <Register onLoginClick={onLoginClick} />;
  }

  return (
    <div className="app-container">
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div className="login-form-container">
        <h2 className="login-title">Welcome Back!</h2>

        <div className="input-group">
          <label htmlFor="username" className="input-label">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" className="text-input" />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" className="text-input" />
        </div>

        <button type="submit" className="register-button">Login</button>

        <div className="Social-option">
          <h6>Login with :</h6>
        </div>

        <div className="social-buttons-grid">
          <button className="social-button">
            <Chrome size={20} />
            Google
          </button>
          <button className="social-button">
            <GitBranch size={20} />
            Github
          </button>
        </div>
      </div>

      <div className="register-container">
        Don't have an account?{" "}
        <a href="#" onClick={onRegisterClick} className="register-link">Register</a>
      </div>
    </div>
  );
}

export default App;
