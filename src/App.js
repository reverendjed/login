import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase-config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import UserDashboard from './components/UserDashboard';
import UserRegistrationForm from './components/UserRegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login'; // Ensure this path matches where your Login component is saved
import { fetchUserRole } from './services/firebaseService';

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to store user role

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user role once authenticated
        const role = await fetchUserRole(currentUser.uid);
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole(null); // Reset user role if not logged in
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state upon logout
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect users to UserDashboard if they are logged in, otherwise to the Login page */}
          <Route path="/" element={user ? <Navigate to="/UserDashboard" replace /> : <Navigate to="/Login" replace />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserDashboard" element={<UserDashboard handleLogout={handleLogout} />} />
          <Route path="/register" element={<UserRegistrationForm />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
