//LandingPage.jsx
import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="landing-container">
      <div
        className="text-container"
        style={{
          opacity: 1 - scrollPosition / 400, // Text fades out as you scroll down
          transform: `translateY(${scrollPosition * 0.3}px)`, // Text moves up as you scroll
        }}
      >
        <h1 className={isLoaded ? "fade-in-left from-text" : ""}>from</h1>
        <h1 className={isLoaded ? "fade-in-right complex-text" : ""}>Complex</h1>
        <h1 className={isLoaded ? "fade-in-left to-text" : ""}>to</h1>
        <h1 className={isLoaded ? "fade-in-right impactful-text" : ""}>Impactful</h1>
      </div>
    </div>
  );
};

export default LandingPage;