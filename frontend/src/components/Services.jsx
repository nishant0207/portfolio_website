// Services.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  // Fetch services data from JSON file
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/services.json'); // Adjust the path according to your project structure
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    fetchServices();
  }, []);

  // Function to start animation
  const startAnimation = () => {
    const scrollAmount = carouselRef.current.scrollWidth / 10; // Adjust speed by changing the division
    animationRef.current = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += scrollAmount;
        // Reset scroll when reaching the end
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 100); // Adjust the interval for smoother or faster movement
  };

  // Function to stop animation on hover
  const stopAnimation = () => {
    clearInterval(animationRef.current);
  };

  useEffect(() => {
    startAnimation();

    return () => {
      clearInterval(animationRef.current);
    };
  }, []);

  return (
    <div className="services-section">
      <h1 className="services-title">&lt;services&gt;</h1>
      <div className="services-container" onMouseEnter={stopAnimation} onMouseLeave={startAnimation}>
        <div className="carousel" ref={carouselRef}>
          {services.concat(services).map((service, index) => (
            <div className="service-tile" key={index}>
              <img src={service.image} alt={service.title} className="service-image" />
              <h3 className="service-title">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;