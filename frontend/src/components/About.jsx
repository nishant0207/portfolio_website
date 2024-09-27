// About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-section">
      <h1 className="about-title">&lt;about&gt;</h1>
      <div className="about-content">
        <div className="about-text">
          <p className="intro-text">
            I'm a <span>Full Stack Developer</span> with experience in creating <span>high-performance, scalable</span> applications. 
            I work with a diverse set of tools, including <span>Java, React, Node.js</span>, and other modern web technologies.
          </p>
          <p>
            Over the course of my career, I have developed a solid understanding of <span>REST APIs, cloud-based systems</span>, and 
            improving performance metrics for enterprise applications. My code is always hand-crafted to ensure optimal performance 
            across devices and platforms.
          </p>
          <p>
            I strive to push the boundaries of what's possible in web development, while maintaining the highest standards of 
            <span> usability</span> and <span>browser compatibility</span>.
          </p>
        </div>

        <div className="about-image-container">
          <img src="image.jpg" alt="Nishant Dalal" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default About;