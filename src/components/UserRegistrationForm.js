import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import './UserRegistrationForm.css'; // Ensure this file exists for styling

function UserRegistrationForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState('Level I'); // Default to Level I
  const [passwordError, setPasswordError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return; // Stop the registration process if passwords do not match
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a corresponding user document in Firestore
      const db = getFirestore();
      const userDocRef = collection(db, 'users');

      // Define the user data to be stored in Firestore
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        role: level, // Assuming 'level' matches your Firestore field name for user roles
        uid: user.uid,
      };

      // Add the user data to Firestore
      await addDoc(userDocRef, userData);

      await signOut(auth); // Optional: Sign out user after successful registration
      setRegistrationSuccess(true);

      // Delay navigation to give users time to see the success message
      setTimeout(() => {
        navigate('/login'); // Navigate to login page after a delay
      }, 5000); // 5 seconds delay

    } catch (error) {
      console.error("Error creating user:", error.message);
      setPasswordError(error.message); // Show error message from the registration attempt
    }
  };

  return (
    <div className="registration-form-container">
      <img src={`${process.env.PUBLIC_URL}/h2logo.png`} alt="H2O Logo" className="login-logo" />
      {registrationSuccess ? (
        <div className="registration-success">
          <p>Registration successful! Please log in.</p>
          <button onClick={() => navigate('/login')}>Back to Login</button>
        </div>
      ) : (
        <form onSubmit={handleRegistration} className="registration-form">
          <h2>Create a New H2Overwatch Account</h2>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <select value={level} onChange={(e) => setLevel(e.target.value)} required>
            <option value="Level I">Level I</option>
            <option value="Level II">Level II</option>
            <option value="Level III">Level III</option>
            <option value="Level IV">Level IV</option>
          </select>
          {passwordError && <p className="error">{passwordError}</p>}
          <button type="submit" className="register-button">Register</button>
        </form>
      )}
    </div>
  );
}

export default UserRegistrationForm;
