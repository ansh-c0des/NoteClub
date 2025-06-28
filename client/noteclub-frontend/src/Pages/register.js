import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff icons




// Register component
function Register({ onLoginClick }) { // Receive onLoginClick prop
  // States for all registration fields
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

  // Function to toggle main password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevShowPassword => !prevShowPassword);
  };

  // Handle registration form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Basic validation example
    if (password !== confirmPassword) {
      alert('Passwords do not match!'); // Use a custom modal for production
      return;
    }
    // Here you would typically send data to a backend
    console.log({
      username,
      email,
      phoneNumber,
      dateOfBirth,
      educationCourse,
      password,
    });
    alert('Registration successful (simulated)!'); // Use a custom modal for production
    // Optionally redirect to login or dashboard
    onLoginClick();
  };

  return (
    <> {/* Use a fragment as Register is rendered within App's div */}
      {/* Register Form Container - Reusing login-form-container for consistent styling */}
      <div className = "app-container">
      <div className="login-form-container"> {/* Class name reused for consistent styling */}
        <h2 className="login-title">Create Your Account</h2> {/* Reusing login-title */}

        <form onSubmit={handleRegisterSubmit}>
          {/* Username Input */}
          <div className="input-group">
            <label htmlFor="regUsername" className="input-label">Username</label>
            <input
              type="text"
              id="regUsername"
              name="regUsername"
              placeholder="Choose a username"
              className="text-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email ID Input */}
          <div className="input-group">
            <label htmlFor="regEmail" className="input-label">Email ID</label>
            <input
              type="email"
              id="regEmail"
              name="regEmail"
              placeholder="Enter your email"
              className="text-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="input-group">
            <label htmlFor="regPhoneNumber" className="input-label">Phone Number</label>
            <input
              type="tel"
              id="regPhoneNumber"
              name="regPhoneNumber"
              placeholder="Enter your phone number"
              className="text-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* Date of Birth Input */}
          {/* Date of Birth Input */}
            <div className="input-group">
            <label htmlFor="regDob" className="input-label">Date of Birth</label>
            <input
                type="date"
                id="regDob"
                name="regDob"
                className="text-input"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max="2009-12-31" // Only allows dates before 2010
            />
            </div>


          {/* Education Course Input */}
          <div className="input-group">
            <label htmlFor="regCourse" className="input-label">Education Course</label>
            <input
              type="text"
              id="regCourse"
              name="regCourse"
              placeholder="e.g., Computer Science, Business"
              className="text-input"
              value={educationCourse}
              onChange={(e) => setEducationCourse(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="regPassword" className="input-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="regPassword"
                name="regPassword"
                placeholder="Create a password"
                className="text-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Confirm Password Input */}
          <div className="input-group">
            <label htmlFor="regConfirmPassword" className="input-label">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="regConfirmPassword"
                name="regConfirmPassword"
                placeholder="Confirm your password"
                className="text-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Register Button */}
          <button
            type="submit"
            className="register-button" // New class for register button specific styling
          >
            Register Account
          </button>
        </form>
      </div>

      {/* "Already have an account? Login" link */}
      <p className="register-prompt"> {/* Reusing this class for consistent spacing */}
        Already have an account? <a href="#" onClick={onLoginClick} className="register-link">Login</a>
      </p>
      </div>
    </>
  );
}

export default Register;
