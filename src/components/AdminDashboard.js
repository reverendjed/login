/**
 * @file AdminDashboard.js
 * @description This is the main administrative dashboard component for the H2Overwatch Tool Suite. 
 * It provides administrators with tools and analytics for system management.
 * 
 * @module components/AdminDashboard
 * @exports AdminDashboard
 * 
 * @author Jeffry Jones
 * @date 2024-02-03
 */

import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

/**
 * Admin Dashboard component.
 * 
 * @returns {JSX.Element} The rendered Admin Dashboard component.
 */
function AdminDashboard() {
  const navigate = useNavigate();

  /**
   * Handles the logout functionality.
   * 
   * @async
   * @function handleLogout
   * @returns {Promise<void>} A promise that resolves when the user is signed out successfully.
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Administrator signed out successfully");
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Function to navigate back to the User Dashboard
  const goToUserDashboard = () => {
    navigate('/UserDashboard'); // Navigate to the User Dashboard
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={`${process.env.PUBLIC_URL}/h2logo.png`} className="App-logo" alt="H2Overwatch Logo" />
        <h1>Welcome to the Admin Dashboard</h1>
      </div>
      <div className="dashboard-content">
        <h2>System Management & Analytics</h2>
        {/* Example administrative tasks links/buttons */}
        <button onClick={() => navigate('/user-management')}>User Management</button>
        <button onClick={() => navigate('/system-analytics')}>System Analytics</button>
        <button onClick={() => navigate('/content-overview')}>Content Overview</button>
        <button onClick={() => navigate('/settings')}>Settings</button>
        {/* Button to navigate back to User Dashboard */}
        <button onClick={goToUserDashboard}>Back to User Dashboard</button>
      </div>
      <div className="dashboard-footer">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
