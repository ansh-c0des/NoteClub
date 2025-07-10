// src/Pages/Register.js
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../services/api';

// Register component
function Register({ onLoginClick }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [educationCourse, setEducationCourse] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // States to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States for feedback messages
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('red');

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  // Handle registration
  const handleRegisterSubmit = async e => {
    e.preventDefault();
    setFeedbackMessage('');
    setFeedbackColor('red');

    if (password !== confirmPassword) {
      setFeedbackMessage('Passwords do not match!');
      return;
    }

    // Build payload matching backend DTO
    const newUser = {
      username:     username,
      email_id:     email,
      phone_number: phoneNumber,
      dob:          dateOfBirth,
      eduCourse:   educationCourse,
      password:     password,
    };

    try {
      const response = await registerUser(newUser);

      // Backend returns either a status or string
      if (response === 'User Registered Successfully' || response.status === 200) {
        setFeedbackMessage('Registration successful! Please login.');
        setFeedbackColor('green');
        // Clear form
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setDateOfBirth('');
        setEducationCourse('');
        setPassword('');
        setConfirmPassword('');
        // Redirect to login after delay
        setTimeout(() => onLoginClick(), 2000);
      } else {
        setFeedbackMessage(response || 'Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setFeedbackMessage(error.response.data || 'Registration failed. Please check your details.');
      } else if (error.request) {
        setFeedbackMessage('Network error. Please ensure the server is running.');
      } else {
        setFeedbackMessage('An unexpected error occurred during registration.');
      }
      console.error('Registration error:', error);
    }
  };

  return (
      <div className="app-container">
        <div className="login-form-container">
          <h2 className="login-title">Create Your Account</h2>
          <form onSubmit={handleRegisterSubmit}>
            {/* Username */}
            <div className="input-group">
              <label htmlFor="regUsername" className="input-label">Username</label>
              <input
                  type="text"
                  id="regUsername"
                  placeholder="Choose a username"
                  className="text-input"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="regEmail" className="input-label">Email ID</label>
              <input
                  type="email"
                  id="regEmail"
                  placeholder="Enter your email"
                  className="text-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
              />
            </div>

            {/* Phone Number */}
            <div className="input-group">
              <label htmlFor="regPhoneNumber" className="input-label">Phone Number</label>
              <input
                  type="tel"
                  id="regPhoneNumber"
                  placeholder="Enter your phone number"
                  className="text-input"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Date of Birth */}
            <div className="input-group">
              <label htmlFor="regDob" className="input-label">Date of Birth</label>
              <input
                  type="date"
                  id="regDob"
                  className="text-input"
                  value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.target.value)}
                  max="2009-12-31"
              />
            </div>

            {/* Education Course */}
            <div className="input-group">
              <label htmlFor="regCourse" className="input-label">Education Course</label>
              <input
                  type="text"
                  id="regCourse"
                  placeholder="e.g., Computer Science"
                  className="text-input"
                  value={educationCourse}
                  onChange={e => setEducationCourse(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="regPassword" className="input-label">Password</label>
              <div className="password-input-wrapper">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="regPassword"
                    placeholder="Create a password"
                    className="text-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-button"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="regConfirmPassword" className="input-label">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="regConfirmPassword"
                    placeholder="Confirm your password"
                    className="text-input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="password-toggle-button"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Feedback */}
            {feedbackMessage && (
                <p className={`feedback-message ${feedbackColor === 'red' ? 'text-red-500' : 'text-green-500'} text-center mt-2`}>
                  {feedbackMessage}
                </p>
            )}

            <button type="submit" className="register-button">
              Register Account
            </button>
          </form>
        </div>

        <p className="register-prompt">
          Already have an account? <a href="#" onClick={onLoginClick} className="register-link">Login</a>
        </p>
      </div>
  );
}

export default Register;
