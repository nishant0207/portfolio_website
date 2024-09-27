// Projects.jsx
import React from 'react';
import './Projects.css';

const projectsData = [
  {
    title: 'Room Connect',
    description: 'A web application for managing and sharing room information for VIT students with features like taxi sharing and WhatsApp group integration.',
    techStack: ['React.js', 'Firebase'],
    liveDemo: 'https://room-connect.vercel.app/',
    github: 'https://github.com/nishant0207/room_connect',
  },
  {
    title: 'MailChamp.Ai',
    description: 'An automated email solution using MailChamp API, providing tailored email distribution and analytics for campaigns.',
    techStack: ['Node.js', 'React.js', 'MongoDB', 'Python'],
    liveDemo: 'https://mailchamp.ai/about',
    github: 'https://github.com/your-github-link-for-MailChamp',
  },
  {
    title: 'School Management System',
    description: 'A comprehensive platform for academic management, facilitating communication between students, faculty, and administration.',
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Firebase'],
    liveDemo: 'https://schoolm.vercel.app/',
    github: 'https://github.com/nishant0207/school_management_project_MERN',
  },
  {
    title: 'Podcast App',
    description: 'An Android podcast application with seamless playback, user authentication via Firebase, and custom UI using Jetpack Compose.',
    techStack: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    liveDemo: '', // Link to GitHub for this project
    github: 'https://github.com/nishant0207/PodKast',
  },
  {
    title: 'Ethereum Transactions Tracker',
    description: 'This project monitors Ethereum blockchain deposits in real-time, stores the deposit details in a MongoDB database, and sends instant Telegram alerts whenever a new deposit is detected. It uses the Alchemy API to interact with the Ethereum blockchain and the ethers.js library to fetch transaction data.',
    techStack: ['Node.js', 'Express.js', 'Ethers.js', 'MongoDB', 'Winston', 'Telegram Bot API', 'Alchemy API'],
    liveDemo: '', // No demo link available
    github: 'https://github.com/your-github-link-for-think-project', // Add the GitHub repo link here
  },
  {
    title: 'File Sharing System Backend',
    description: 'This project implements a file-sharing backend system using Go, AWS S3, PostgreSQL, Redis, JWT-based authentication, and WebSockets for real-time notifications. The system allows users to upload, retrieve, share, search, and delete files securely. It also includes periodic file expiration and deletion functionality.',
    techStack: ['Go', 'PostgreSQL', 'Redis', 'AWS S3', 'JWT', 'WebSockets'],
    liveDemo: '', // No demo link available
    github: 'https://github.com/your-github-link-for-think-project', // Add the GitHub repo link here
  }
];

const Projects = () => {
  return (
    <div className="projects-section">
      <h1 className="projects-title" style={{ color: 'black' }}>&lt;projects&gt;</h1>
      {/* Carousel container for projects */}
      <div className="projects-carousel">
        {projectsData.map((project, index) => (
          <div key={index} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="tech-stack">
              {project.techStack.map((tech, i) => (
                <span key={i} className="tech-item">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
              )}
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;