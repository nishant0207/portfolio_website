// Skills.js
import React, { useEffect, useState } from 'react';
import './Skills.css';
import axios from 'axios';
import CertificationTile from './CertificationTile'; // Import the CertificationTile component

const Skills = () => {
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await axios.get('https://portfolio-website-backend-dhfz.onrender.com/api/leetcode-stats');
        const data = response.data;
        setLeetcodeStats(data);
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
      }
    };

    // Fetch certifications data from the JSON file
    const fetchCertifications = async () => {
      try {
        const response = await fetch('/certifications.json');
        const data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error('Error fetching Certifications data:', error);
      }
    };

    fetchLeetCodeStats();
    fetchCertifications();
  }, []);

  return (
    <div className="skills-section">
      <h1 className="skills-title">&lt;skills&gt;</h1>

      <div className="skills-container">
        <h1>Certifications</h1>
        {/* Carousel Container to enable horizontal scrolling */}
        <div className="carousel-container">
          {certifications.map((cert, index) => (
            <CertificationTile
              key={index}
              title={cert.title}
              image={cert.image}
              link={cert.link}
            />
          ))}
        </div>
      </div>

      <h2 className="leetcode-title">LeetCode Stats</h2>
      {leetcodeStats ? (
        <div className="leetcode-container">
          <div className="leetcode-solved">
            <h3>{leetcodeStats.easySolved + leetcodeStats.mediumSolved + leetcodeStats.hardSolved}/3284</h3>
            <p>Solved</p>
          </div>
          <div className="leetcode-difficulty">
            <p>
              <span className="easy">Easy</span>: {leetcodeStats.easySolved}
            </p>
            <p>
              <span className="medium">Medium</span>: {leetcodeStats.mediumSolved}
            </p>
            <p>
              <span className="hard">Hard</span>: {leetcodeStats.hardSolved}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading LeetCode Stats...</p>
      )}
    </div>
  );
};

export default Skills;