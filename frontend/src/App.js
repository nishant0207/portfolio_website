// App.js
import React,{useEffect} from "react";
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

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);
  return (
    <div>
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