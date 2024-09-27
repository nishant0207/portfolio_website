// CertificationTile.js
// CertificationTile.js
import React from 'react';
import './CertificationTile.css'; // Import the updated CSS

const CertificationTile = ({ title, image, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="certification-link">
      <div className="certification-tile">
        <div className="certification-image-container">
          <img src={image} alt={title} className="certification-image" />
        </div>
        <div className="certification-title-container">
          <p className="certification-title">{title}</p>
        </div>
      </div>
    </a>
  );
};

export default CertificationTile;