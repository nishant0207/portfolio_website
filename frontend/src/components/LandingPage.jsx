import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const handleScrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewMyWork = () => {
    // Open GitHub profile
    window.open('https://github.com/nishant0207', '_blank');
  };

  return (
      <div className="landing-container">
        <div className="content">
          <div className="text-content">
            <h1>
              Hi, I'm <span className="highlight">Nishant Dalal</span>
            </h1>
            <h2>Building innovative software solutions with precision and passion.</h2>
            <div className="button-group">
              <button className="primary-btn" onClick={handleViewMyWork}>
                View my work →
              </button>
              <button className="secondary-btn" onClick={handleScrollToContact}>
                Contact
              </button>
            </div>
          </div>
          <div className="visual-content">
            <img src="/tile_images/landingpage-image.png" alt="Visual Representation" className="illustration" />
          </div>
        </div>
      </div>
  );
};

export default LandingPage;