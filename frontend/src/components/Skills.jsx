// Skills.jsx
import React, { useEffect, useState } from 'react';
import './Skills.css';
import axios from 'axios';

const Skills = () => {
  const [leetcodeStats, setLeetcodeStats] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await axios.get('https://portfolio-website-backend-dhfz.onrender.com/api/leetcode-stats');
        setLeetcodeStats(response.data);
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
      }
    };

    fetchLeetCodeStats();
  }, []);

  return (
    <div className="skills-section">
      <h1 className="skills-title">&lt;skills&gt;</h1>

      <div className="skills-container">
        {/* Skill bars code */}
      </div>

      <h2 className="leetcode-title">LeetCode Stats</h2>
      {leetcodeStats ? (
        <div className="leetcode-container">
          <div className="leetcode-solved">
            <h3>{leetcodeStats.easySolved + leetcodeStats.mediumSolved + leetcodeStats.hardSolved}/3284</h3>
            <p>Solved</p>
          </div>
          <div className="leetcode-difficulty">
            <p><span className="easy">Easy</span>: {leetcodeStats.easySolved}</p>
            <p><span className="medium">Medium</span>: {leetcodeStats.mediumSolved}</p>
            <p><span className="hard">Hard</span>: {leetcodeStats.hardSolved}</p>
          </div>
        </div>
      ) : (
        <p>Loading LeetCode Stats...</p>
      )}
    </div>
  );
};

export default Skills;