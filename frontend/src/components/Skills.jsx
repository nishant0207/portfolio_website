// Skills.jsx
import React, { useEffect, useState } from 'react';
import './Skills.css';
import axios from 'axios';
import CertificationTile from './CertificationTile';
import Loader from "./Loader"
// import LeetCodeCalendar from 'leetcode-calendar'
import GithubHeatmap from './GithubHeatmap';

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

  // const exampleTheme = {
  //   light: [
  //     'rgb(235, 235, 235)',
  //     'rgba(192, 132, 245, 0.44)',
  //     'rgba(192, 132, 245, 0.6)',
  //     'rgba(192, 132, 245, 0.76)',
  //     'rgba(192, 132, 245, 0.92)',
  //   ],
  //   dark: [
  //     'rgb(235, 235, 235)',
  //     'rgba(192, 132, 245, 0.44)',
  //     'rgba(192, 132, 245, 0.6)',
  //     'rgba(192, 132, 245, 0.76)',
  //     'rgba(192, 132, 245, 0.92)',
  //   ],
  // };

  return (
    <div className="skills-section">
      <h1 className="skills-title">&lt;skills&gt;</h1>

      <div className="skills-container">
        <h1 style={{fontFamily:"Courier New"}}>&lt;Certifications/&gt;</h1>
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
        <Loader />
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
          {/*<div*/}
          {/*  style={{*/}
          {/*    display: 'flex', // Use flexbox*/}
          {/*    justifyContent: 'center', // Center horizontally*/}
          {/*    alignItems: 'center', // Center vertically*/}
          {/*    width: '90vw',*/}
          {/*    marginTop: "150px",*/}
          {/*    overflowX: "auto",*/}
          {/*    whiteSpace: "nowrap",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <LeetCodeCalendar*/}
          {/*    username="ndalal0207"*/}
          {/*    blockSize={18} // Size of each block in pixels (default: 15)*/}
          {/*    blockMargin={5} // Margin between blocks in pixels (default: 5)*/}
          {/*    fontSize={18} // Font size of the text within blocks (default: 16)*/}
          {/*    theme={exampleTheme} // A custom theme object to style the calendar*/}
          {/*    style={{ maxWidth: '1500px' }} // Inline styles for the calendar container*/}
          {/*  />*/}
          {/*</div>*/}
        </>
      ) : (
        <div className="heatmap-container">
          <p>Loading LeetCode Stats...</p>
        </div>
      )}
      <div className='heatmap-outer-container'>
        <GithubHeatmap/>
      </div>
    </div>
  );
};

export default Skills;