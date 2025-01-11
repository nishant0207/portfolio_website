import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-section">
      <h1 className="about-title">&lt;about&gt;</h1>
      <div className="about-content">
        <div className="about-text">
          <p>
            I am a <span>Full Stack Developer</span> with experience in building
            <span> high-performance, scalable</span> web applications using <span>React</span>, <span>Node.js</span>,
            <span> Flask</span>, <span>MongoDB</span>, <span>AWS</span>, and other modern technologies.
          </p>
          <div className="work-experience" style={{display:"flex"}}>
            <h1 style={{ display: 'inline-block', marginRight: '10px' }}>Work Experience:</h1>
            <p style={{ display: 'inline-block' }}>
              Full Stack Developer Intern<span style={{ display: 'block' }}>Neugence Technology</span>
              <span style={{ display: 'block', fontSize: '14px', color: 'gray' }}>May 2025 - Current</span>
            </p>
          </div>
          <p>
            I enjoy solving complex problems and have built a lot of projects, showcasing my expertise in SaaS solutions, blockchain, and cloud integration.
          </p>
          <p>Scroll down to see more...</p>
        </div>
        <div className="about-image-container">
          <img src="image.jpg" alt="Nishant Dalal" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default About;