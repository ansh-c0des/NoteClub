import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Chrome, GitBranch } from 'lucide-react';
import './App.css';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import AuthenticatedLayout from './Components/AuthenticatedLayout';
import UploadNotes from './Pages/Upload_notes';
import SearchNotes from './Pages/Search_notes';
import MyLibrary from './Pages/My_library';
import Settings from './Pages/Settings';
import { loginUser } from './services/api';

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

  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    isDarkMode ? html.classList.add('dark') : html.classList.remove('dark');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedbackMessage('');
    setFeedbackColor('red');

    try {
      const data = await loginUser({ username, password }); // ✅ central API usage
      const jwtToken = data.token;

      if (jwtToken) {
        localStorage.setItem('jwtToken', jwtToken);
        console.log('Login successful! JWT Token:', jwtToken);
        setFeedbackMessage('Login Successful!');
        setFeedbackColor('green');
        navigate('/dashboard');
      } else {
        setFeedbackMessage('Login successful, but no token received from the server.');
        console.error('Login successful, but no token in response');
      }
    } catch (error) {
      if (error.response) {
        setFeedbackMessage(error.response.data.message || 'Login failed. Check your username and password.');
        console.error('Login failed:', error.response.data);
      } else {
        setFeedbackMessage('Network/server error. Ensure Spring Boot server is running.');
        console.error('Login error:', error);
      }
    }
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

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
                  placeholder="Enter your password"
                  className="text-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>

            {feedbackMessage && (
                <p className={`feedback-message ${feedbackColor === 'red' ? 'text-red-500' : 'text-green-500'} text-center mt-2`}>
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
          Don't have an account?{' '}
          <a href="#" onClick={onRegisterClick} className="register-link">Register</a>
        </div>
      </div>
  );
}

export default function AppWrapper() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    isDarkMode ? html.classList.add('dark') : html.classList.remove('dark');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register onLoginClick={() => window.location.href = '/'} />} />

          {/* Protected routes */}
          <Route
              path="/dashboard/*"
              element={
                <AuthenticatedLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
                  <Routes>
                    <Route index element={<Profile />} />
                    <Route path="upload-notes" element={<UploadNotes />} />
                    <Route path="search-notes" element={<SearchNotes />} />
                    <Route path="my-library" element={<MyLibrary />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </AuthenticatedLayout>
              }
          />
        </Routes>
      </BrowserRouter>
  );
}
