//Contact.jsx
import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div id="contact" className="contact-section">
            <h2>&lt;contact me&gt;</h2>
            
            <div className="contact-details">
                <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <p>Email: <a href="mailto:dalalnishant0207@gmail.com">dalalnishant0207@gmail.com</a></p>
                </div>
                
                <div className="contact-item">
                    <i className="fab fa-linkedin"></i>
                    <p>LinkedIn: <a href="https://www.linkedin.com/in/ndalal0207/" target="_blank" rel="noreferrer">ndalal0207</a></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;