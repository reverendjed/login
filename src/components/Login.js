import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';
import './Login.css'; // Ensure this CSS file exists and is correctly styled

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/UserDashboard'); // Redirect to UserDashboard upon successful login
    } catch (error) {
      setLoginError('Login failed. Please try again.'); // Display a login failure message
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container">
      <img src={`${process.env.PUBLIC_URL}/h2logo.png`} alt="H2O Logo" className="login-logo" />
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login to Your Account</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <div className="login-error">{loginError}</div>}
        <button type="submit" className="login-button">Login</button>
        <button onClick={() => navigate('/register')} className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Login;
