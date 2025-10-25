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
          <div className="work-experience" style={{display:"flex", gap:20}}>
            <div style={{display:"flex"}}>
              <h1 style={{display: 'inline-block', marginRight: '10px'}}>Work Experience:</h1>
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between",marginTop:20, marginBottom:20, paddingTop:10, paddingBottom:10}}>
                <h4 style={{margin: "0 auto", fontSize:20}}>Full Stack Developer Intern</h4>
                <span style={{ display: 'block', fontSize:18}}>Neugence Technology</span>
                <span style={{ display: 'block', color: 'gray', fontSize:16}}>May 2024 - Current</span>
            </div>
          </div>
          <p>
            I enjoy solving complex problems and have built a lot of projects, showcasing my expertise in SaaS solutions, blockchain, and cloud integration.
          </p>
          <p>Scroll down to see more...</p>
        </div>
        <div className="about-image-container">
          <img src="https://media.licdn.com/dms/image/v2/D5603AQH2V9Ky1m576Q/profile-displayphoto-shrink_800_800/B56ZPmKhlPHQAc-/0/1734733339526?e=1762992000&v=beta&t=HaAH9h0zx2hv9wurU6G8NYEYmMhoMgDEbwyz0m-6tS8" alt="Nishant Dalal" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default About;