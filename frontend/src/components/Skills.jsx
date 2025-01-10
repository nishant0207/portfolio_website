import React, { useEffect, useState } from 'react';
import './Skills.css';
import axios from 'axios';
import CertificationTile from './CertificationTile';
import Loader from "./Loader"

const Skills = () => {
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        // const response = await axios.get('http://localhost:5001/api/leetcode-stats');
        const response = await axios.get('https://portfolio-website-backend-dhfz.onrender.com/api/leetcode-stats');
        setLeetcodeStats(response.data);
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCertifications = async () => {
      try {
        const response = await fetch('/certifications.json');
        setCertifications(await response.json());
      } catch (error) {
        console.error('Error fetching Certifications data:', error);
      }
    };

    fetchLeetCodeStats();
    fetchCertifications();
  }, []);

  const renderHeatmapTiles = (submissions) => {
    const submissionMap = new Map(submissions.map(({ date, count }) => [date, count]));
    const endDate = new Date(); // Current date
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1); // Start date is 1 year ago from today
    const weeks = [];
    const monthLabels = [];
  
    let currentMonth = -1;
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date.toISOString().split('T')[0];
      const submissionCount = submissionMap.get(formattedDate) || 0;
      const month = date.getMonth();
  
      const colorClass =
        submissionCount > 3
          ? 'tile-level-4'
          : submissionCount > 2
          ? 'tile-level-3'
          : submissionCount > 1
          ? 'tile-level-2'
          : submissionCount > 0
          ? 'tile-level-1'
          : '';
  
      const weekIndex = Math.floor(
        (date - startDate) / (7 * 24 * 60 * 60 * 1000)
      );
  
      if (!weeks[weekIndex]) weeks[weekIndex] = [];
  
      weeks[weekIndex].push(
        <div
          key={formattedDate}
          className={`heatmap-tile ${colorClass}`}
          data-count={submissionCount}
          data-date={formattedDate}
        ></div>
      );
  
      // Add month label at the start of each month and mark columns
      if (month !== currentMonth) {
        currentMonth = month;
        monthLabels[weekIndex] = date.toLocaleString('default', { month: 'short' });
        // Mark the first week of the new month
        weeks[weekIndex].isNewMonth = true;
      }
    }
  
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
      <div key={day} className="day-label">
        {day}
      </div>
    ));
  
    return (
      <div className="heatmap-outer-wrapper">
        <div className="heatmap-wrapper">
          <div className="day-labels">{dayLabels}</div>
          <div className="heatmap-scrollable">
            <div className="graph-wrapper">
              <div className="contribution-graph">
                {weeks.map((week, index) => (
                  <div
                    key={index}
                    className={`graph-column ${
                      week.isNewMonth ? 'new-month' : ''
                    }`}
                  >
                    {week.map((day) => day)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="skills-section">
      <h1 className="skills-title">&lt;skills&gt;</h1>

      <div className="skills-container">
        <h1>Certifications</h1>
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

      <h2 className="leetcode-title">&lt;leetcode stats&gt;</h2>
      {isLoading ? (
        <Loader/>
      ) : leetcodeStats ? (
        <>
          <div className="leetcode-container">
            <div className="leetcode-solved">
              <h3>{leetcodeStats.totalSolved}/3284</h3>
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
          <div className="heatmap-container">
            <div className="heatmap-section">
              {renderHeatmapTiles(leetcodeStats.submissions)}
            </div>
          </div>
        </>
      ) : (
        <div className="heatmap-container">
          <p>Loading LeetCode Stats...</p>
        </div>
      )}
    </div>
  );
};

export default Skills;