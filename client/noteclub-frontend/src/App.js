import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chrome, GitBranch } from 'lucide-react';
import './App.css';
import Register from './Pages/Register';
import Profile from './Pages/Profile'; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('red');

  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    e.preventDefault();

    setFeedbackMessage('');
    setFeedbackColor('red');

    const loginEndpoint = 'http://localhost:8080/api/login';

    try {
      const response = await axios.post(loginEndpoint, {
        username,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
        });

      const jwtToken = response.data.token;

      if (jwtToken) {
        localStorage.setItem('jwtToken', jwtToken);

        console.log('Login successful! JWT Token:', jwtToken);
        setFeedbackMessage('Login Successful!');
        setFeedbackColor('green');

        // Navigate to Profile
        navigate('/Profile');
      } else {
        setFeedbackMessage('Login successful, but no token received from the server.');
        setFeedbackColor('red');
        console.error('Login successful, but no token received in response from:', loginEndpoint);
      }
    } catch (error) {
      if (error.response) {
        setFeedbackMessage(error.response.data.message || 'Login failed. Please check your username and password.');
        setFeedbackColor('red');
        console.error('Login failed (HTTP status ' + error.response.status + '):', error.response.data);
      } else {
        setFeedbackMessage('Network error or server unreachable. Please ensure your Spring Boot server is running and accessible at ' + loginEndpoint + '.');
        setFeedbackColor('red');
        console.error('Error during login operation:', error);
      }
    }
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    setShowRegister(true);
  };

  const onLoginClick = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
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
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username" className="input-label">Username</label>
              <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="text-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="text-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>

            {feedbackMessage && (
                <p className={`feedback-message ${feedbackColor === 'red' ? 'error' : 'success'}`}>
                  {feedbackMessage}
                </p>
            )}

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
          </form>
        </div>

        <div className="register-container">
          Don't have an account?{" "}
          <a href="#" onClick={onRegisterClick} className="register-link">Register</a>
        </div>
      </div>
  );
}

export default function AppWrapper() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
  );
}
