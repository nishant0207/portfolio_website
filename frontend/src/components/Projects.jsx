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
    liveDemo: '',
    github: 'https://github.com/nishant0207/PodKast',
  },
  {
    title: 'Ethereum Transactions Tracker',
    description: 'This project monitors Ethereum blockchain deposits in real-time, stores the deposit details in a MongoDB database, and sends instant Telegram alerts whenever a new deposit is detected. It uses the Alchemy API to interact with the Ethereum blockchain and the ethers.js library to fetch transaction data.',
    techStack: ['Node.js', 'Express.js', 'Ethers.js', 'MongoDB', 'Winston', 'Telegram Bot API', 'Alchemy API'],
    liveDemo: '',
    github: 'https://github.com/nishant0207/Ethereum-Transaction-Tracker',
  },
  {
    title: 'File Sharing System Backend',
    description: 'This project implements a file-sharing backend system using Go, AWS S3, PostgreSQL, Redis, JWT-based authentication, and WebSockets for real-time notifications.',
    techStack: ['Go', 'PostgreSQL', 'Redis', 'AWS S3', 'JWT', 'WebSockets'],
    liveDemo: '',
    github: 'https://github.com/nishant0207/online-filesharing-backend-system',
  },
  {
    title: 'Github Streak Maintainer',
    description: 'This project implements a backend system which automatically pushes LeetCode solved questions to my GitHub repository to maintain my GitHub streak.',
    techStack: ['Javascript', 'Nodejs', 'Self Ping'],
    liveDemo: '',
    github: 'https://github.com/nishant0207/github-streak-bot',
  },
  {
    title: 'Quiz App for NPTEL Exam (Conservation Geography)',
    description: 'A full-stack project using React for the frontend and Node for the backend. Questions are fetched from the backend and rendered dynamically based on the week requested.',
    techStack: ['Javascript', 'Nodejs', 'React', 'Self Ping'],
    liveDemo: 'https://conservation-geography.vercel.app/',
    github: 'https://github.com/nishant0207/conservation-geography-nptel',
  },
  {
    title: 'Campaign Management App',
    description: 'A web application allowing brands to manage customer relationships, create audience segments, and send personalized campaigns.',
    techStack: ['Javascript', 'Nodejs', 'Reactjs'],
    liveDemo: 'https://crm-frontend-ebon-delta.vercel.app/',
    github: 'https://github.com/nishant0207/CRM-Campaign-Management-App',
  },
  {
    title: 'Fast Dark Mode Extension',
    description: 'A Chrome extension to enable dark mode for Fast.com, tailored for night-time browsing.',
    techStack: ['Javascript'],
    liveDemo: '',
    github: 'https://github.com/nishant0207/fast-dark-mode',
  },
  {
    title: 'Assignment Management Tool',
    description: 'A full-stack web application for project managers to assign tasks, track progress, and calculate scores dynamically.',
    techStack: ['Javascript', 'Reactjs', 'Nodejs'],
    liveDemo: 'https://assignment-management-tool.vercel.app/',
    github: 'https://github.com/nishant0207/assignment-management-tool',
  },
  {
    title: 'Slack Rag Bot',
    description: `
    - Built a multi-platform bot integrating Slack, LinkedIn, and Discord APIs to automate workflows.
    - Implemented Slack slash commands for posting on LinkedIn and automated resume generation.
    - Designed MongoDB-based workflows and developed scalable RESTful APIs with Flask.
  `,
    techStack: ['MongoDB', 'Flask', 'Slack API', 'Discord API', 'LinkedIn API'],
    liveDemo: '',
    github: 'Private Repository',
  },
  {
    title: 'Signature Verification System',
    description: 'A final-year project aimed at automating signature verification on bank cheques to reduce fraud. It uses image processing and machine learning algorithms such as SVM, OCR, and a Line Sweep algorithm.',
    techStack: ['Python', 'OpenCV', 'SVM', 'OCR', 'Line Sweep Algorithm'],
    liveDemo: '',
    github: 'https://github.com/nishant0207/Signature-Verification',
  },
  {
    title: 'Online File Sharing (Frontend + Backend)',
    description: 'A full-stack application that enables secure online file sharing with a user-friendly frontend and robust backend implementation.',
    techStack: ['JavaScript', 'Python', 'CSS', 'HTML'],
    liveDemo: '',
    github: 'https://github.com/nishant0207/online-filesharing',
  },
];

const Projects = () => {
  return (
    <div className="projects-section">
      <h1 className="projects-title">&lt;projects&gt;</h1>
      <div className="projects-grid">
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
              {project.liveDemo ? (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
              ) : (
                <span className="project-link-disabled">No Live Demo</span>
              )}
              {project.github === 'Private Repository' ? (
                <span className="project-link-disabled">Private Repository</span>
              ) : (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;