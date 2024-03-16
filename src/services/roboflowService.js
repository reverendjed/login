// services/roboflowService.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const processVideoWithRoboflow = (videoFileName) => {
  const videoPath = path.join(__dirname, '..', 'public', videoFileName);

  fs.readFile(videoPath, { encoding: "base64" }, (err, videoBase64) => {
    if (err) {
      console.error("Error reading the video file:", err);
      return;
    }

    axios({
      method: "POST",
      url: "https://detect.roboflow.com/brown-trout-counter/2", // Replace with your actual endpoint
      params: {
        api_key: "hrHXV6QIsOWhUf9XSJ5F" // Replace with your actual API key
      },
      data: videoBase64,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
  });
};

module.exports = processVideoWithRoboflow;
