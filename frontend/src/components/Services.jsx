import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const carouselRef = useRef(null);

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

  // Function to create an infinite scroll effect
  const infiniteScroll = () => {
    const scrollElement = carouselRef.current;
    if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
      scrollElement.scrollLeft = 0;
    } else {
      scrollElement.scrollLeft += 1; // Adjust the increment for smoother or faster scrolling
    }
  };

  useEffect(() => {
    const interval = setInterval(infiniteScroll, 10); // Adjust interval for smooth scrolling
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="services-section">
      <h1 className="services-title">&lt;services&gt;</h1>
      <div className="services-container">
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