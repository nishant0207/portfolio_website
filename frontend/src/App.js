import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Services from "./components/Services";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skills from "./components/Skills";
import Loader from './components/Loader'; // Import Loader component

const App = () => {
  const [loading, setLoading] = useState(true);

  // Function to handle when all images and assets are loaded
  const handleWindowLoad = () => {
    setLoading(false); // Hide loader when all assets are loaded
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
    window.addEventListener('load', handleWindowLoad); // Listen for the window load event
    return () => {
      window.removeEventListener('load', handleWindowLoad); // Cleanup listener
    };
  }, []);

  return (
    <div>
      {loading && <Loader />} {/* Show loader until loading is false */}
      <Navbar />
      <section id="home">
        <LandingPage />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="services">
        <Services/>
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default App;
