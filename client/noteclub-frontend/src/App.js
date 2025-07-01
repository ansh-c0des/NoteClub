import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chrome, GitBranch } from 'lucide-react';
import './App.css';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
// ADD THESE IMPORTS:
import AuthenticatedLayout from './Components/AuthenticatedLayout';
import UploadNotes from './Pages/Upload_notes';
import SearchNotes from './Pages/Search_notes';
import MyLibrary from './Pages/My_library';
import Settings from './Pages/Settings';


function App() {
  // REMOVE THESE LINES: Dark mode state and toggle logic will be managed by AppWrapper
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


  // REMOVE THIS LINE: showRegister state will be handled by routing
  // const [showRegister, setShowRegister] = useState(false);


  const navigate = useNavigate();


  // REMOVE THIS useEffect: Dark mode effect will be managed by AppWrapper
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);


  // REMOVE THIS FUNCTION: Dark mode toggle will be managed by AppWrapper and Sidebar
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


        // CHANGE THIS LINE: Navigate to the dashboard base route
        navigate('/dashboard');
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


  // CHANGE THIS FUNCTION: Use navigate for routing
  const onRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register'); // Navigate to the register page
  };


  // CHANGE THIS FUNCTION: Use navigate for routing
  const onLoginClick = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    navigate('/'); // Navigate back to the login page
  };


  // REMOVE THIS CONDITIONAL RENDER: Routing handles this now
  // if (showRegister) {
  //   return <Register onLoginClick={onLoginClick} />;
  // }


  return (
      <div className="app-container">
        {/* REMOVE THIS BUTTON: Dark mode toggle will be in Sidebar */}
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
          Don't have an account?{" "}
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
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);


  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  return (
      <BrowserRouter>
        <Routes>
          {/* Public routes - NO SIDEBAR */}
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register onLoginClick={() => window.location.href = '/'} />} />
          {/* Note: In Register component, onLoginClick is currently using window.location.href,
                    you might want to change it to navigate('/') for consistency with react-router-dom */}


          {/* Protected routes - SIDEBAR WILL BE HERE */}
          <Route
              path="/dashboard/*" // Use a wildcard to allow nested routes like /dashboard/settings
              element={
                <AuthenticatedLayout
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                >
                  {/* Nested routes for authenticated users */}
                  <Routes>
                    <Route index element={<Profile />} /> {/* Default route for /dashboard */}
                    <Route path="upload-notes" element={<UploadNotes />} />
                    <Route path="search-notes" element={<SearchNotes />} />
                    <Route path="my-library" element={<MyLibrary />} />
                    <Route path="settings" element={<Settings />} />
                    {/* Add more authenticated routes here as needed */}
                  </Routes>
                </AuthenticatedLayout>
              }
          />
        </Routes>
      </BrowserRouter>
  );
}
