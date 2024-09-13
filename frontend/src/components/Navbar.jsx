// Navbar.jsx
import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state
  const [scrolling, setScrolling] = useState(false); // Track scroll state for background color change

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset;

    // Change background color when scrolling
    if (scrollPos > 50) {
      setScrolling(true);  // Change background when scrolling down
    } else {
      setScrolling(false); // Transparent background at the top
    }

    // Active section handling
    sections.forEach((section) => {
      const id = section.getAttribute('id');
      const offsetTop = section.offsetTop;
      const offsetHeight = section.offsetHeight;

      if (scrollPos >= offsetTop - 50 && scrollPos < offsetTop + offsetHeight - 50) {
        setActiveSection(`#${id}`);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolling ? 'scrolling' : ''}`}>
      <div className="navbar-container">
      <div><h1 className="logo">Nishant Dalal</h1></div>
        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          {/* Hamburger Icon */}
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
        </div>
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <a
              href="#home"
              className={activeSection === '#home' ? 'active' : ''}
              onClick={toggleMenu}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeSection === '#about' ? 'active' : ''}
              onClick={toggleMenu}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className={activeSection === '#skills' ? 'active' : ''}
              onClick={toggleMenu}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={activeSection === '#projects' ? 'active' : ''}
              onClick={toggleMenu}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === '#contact' ? 'active' : ''}
              onClick={toggleMenu}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;