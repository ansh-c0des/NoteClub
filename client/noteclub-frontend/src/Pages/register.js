import React, { useState } from 'react';
import axios from 'axios'; // Import axios
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

  // States for feedback messages (similar to login form)
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('red'); // 'red' for error, 'green' for success

  // Function to toggle main password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevShowPassword => !prevShowPassword);
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => { // Make function async
    e.preventDefault();

    setFeedbackMessage(''); // Clear previous messages
    setFeedbackColor('red');

    if (password !== confirmPassword) {
      setFeedbackMessage('Passwords do not match!');
      setFeedbackColor('red');
      return;
    }

    // Construct the user object matching your Spring Boot Users model
    // Ensure keys match your backend model's field names (e.g., email_id, phone_number, dob, edu_course)
    const newUser = {
      username: username,
      email_id: email, // Matches backend 'email_id'
      phone_number: phoneNumber, // Matches backend 'phone_number'
      dob: dateOfBirth, // Matches backend 'dob'
      edu_course: educationCourse, // Matches backend 'edu_course'
      password: password,
    };

    const registerEndpoint = 'http://localhost:8080/api/register'; // Your backend registration endpoint

    try {
      const response = await axios.post(registerEndpoint, newUser, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Assuming your backend returns a success message or status 200 on successful registration
      if (response.status === 200 || response.data === "User Registered Successfully") {
        setFeedbackMessage('Registration successful! Please login.');
        setFeedbackColor('green');
        // Clear the form fields after successful registration
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setDateOfBirth('');
        setEducationCourse('');
        setPassword('');
        setConfirmPassword('');
        // Optionally redirect to login page after a short delay
        setTimeout(() => {
          onLoginClick(); // Navigate back to the login form
        }, 2000); // Wait 2 seconds before redirecting
      } else {
        setFeedbackMessage(response.data || 'Registration failed. Please try again.');
        setFeedbackColor('red');
        console.error('Registration failed with unexpected response:', response);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setFeedbackMessage(error.response.data || 'Registration failed. Please check your details.');
        setFeedbackColor('red');
        console.error('Registration failed (HTTP status ' + error.response.status + '):', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setFeedbackMessage('Network error or server unreachable. Please ensure your Spring Boot server is running.');
        setFeedbackColor('red');
        console.error('Error during registration operation: No response from server', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setFeedbackMessage('An unexpected error occurred during registration.');
        setFeedbackColor('red');
        console.error('Error during registration operation:', error.message);
      }
    }
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

              {/* Feedback Message Display */}
              {feedbackMessage && (
                  <p className={`feedback-message ${feedbackColor === 'red' ? 'text-red-500' : 'text-green-500'} text-center mt-2`}>
                    {feedbackMessage}
                  </p>
              )}

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
