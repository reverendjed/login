import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';

function UserDashboard() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const goToAdminDashboard = () => {
    navigate('/AdminDashboard');
  };

// This function takes a base64-encoded string of the image (or video)
const handleVideoUpload = async (base64Image) => {
  setIsUploading(true);
  setUploadMessage('');
  
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://detect.roboflow.com/brown-trout-counter/2', // Your endpoint
      params: {
        api_key: 'hrHXV6QIsOWhUf9XSJ5F', // Your API key
      },
      data: base64Image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    console.log(response.data);
    setUploadMessage('Upload successful! Processing complete.');
  } catch (error) {
    // Error handling logic as previously defined
  } finally {
    setIsUploading(false);
  }
};

// This function triggers when a file is selected
const handleFileSelect = (event) => {
  if (event.target.files.length > 0) {
    const fileReader = new FileReader();
    const file = event.target.files[0];
    
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const base64 = fileReader.result;
      // Here, you pass the base64 encoded string to handleVideoUpload
      handleVideoUpload(base64.split(',')[1]); // Correctly passing the base64-encoded image
    };
    fileReader.onerror = (error) => {
      console.error('Error: ', error);
    };
  }
};


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={`${process.env.PUBLIC_URL}/h2logo.png`} className="App-logo" alt="H2Overwatch Logo" />
        <h1>Welcome to the User Dashboard</h1>
      </div>
      <div className="dashboard-content">
        <p>Analytics</p>
        <input type="file" onChange={handleFileSelect} accept="video/*" />
        {isUploading && <p>Uploading and processing video...</p>}
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>
      <div className="dashboard-menu">
        <ul>
          <li>
          <a href={"/test.html"}>Count Fish</a>
          </li>
          <li>Environmental Data</li>
          <li>Database</li>
          <li><button onClick={goToAdminDashboard}>Admin Dashboard</button></li>
        </ul>
      </div>
      <div className="dashboard-footer">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default UserDashboard;
