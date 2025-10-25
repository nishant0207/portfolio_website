// Contact.jsx
import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios'; // Ensure axios is installed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import CSS

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.info('Sending message...', {autoClose:100})
        try {
            const response = await axios.post('https://portfolio-website-backend-dhfz.onrender.com/api/send-message', formData);
            if (response.data.success) {
                toast.success('Message sent successfully!', { autoClose: 3000 });
                setFormData({ name: '', email: '', message: '' }); // reset form
            } else {
                toast.error('Failed to send message.', { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error sending message. Please try again later.', { autoClose: 3000 });
        }
    };

    return (
        <div id="contact" className="contact-section">
            <h2>&lt;contact me&gt;</h2>

            <div className="contact-wrapper">
                {/* Left: Contact details */}
                <div className="contact-details">
                    <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <p>Email: <a href="mailto:dalalnishant0207@gmail.com">dalalnishant0207@gmail.com</a></p>
                    </div>
                    <div className="contact-item">
                        <i className="fab fa-linkedin"></i>
                        <p><a href="https://www.linkedin.com/in/ndalal0207/" target="_blank"
                              rel="noreferrer">LinkedIn</a></p>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-code"></i>
                        <p><a href="https://leetcode.com/u/ndalal0207" target='_blank'
                              rel='noopener noreferrer'>LeetCode</a></p>
                    </div>
                    <div className="contact-item">
                        <i className="fab fa-github"></i>
                        <p><a href="https://github.com/nishant0207" target="_blank" rel="noreferrer">GitHub</a></p>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>Location: <span>Bahadurgarh, Haryana</span></p>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-file-download"></i>
                        <p><a href="https://drive.google.com/file/d/1pijMc9xkesqZdr86-Q2CVdl6kVIKOrfy/view?usp=sharing"
                              target='_blank' rel='noopener noreferrer' download>Resume</a></p>
                    </div>
                </div>

                {/* Right: Contact form */}
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}
                           required/>
                    <input type="email" name="email" placeholder="Your Email" value={formData.email}
                           onChange={handleChange} required/>
                    <textarea style={{maxWidth: "100%", minHeight: "100px"}} name="message"
                              placeholder="Slide into my DMs… but make it professional. Or just send me memes, either way works. 📩"
                              value={formData.message} onChange={handleChange} required></textarea>
                    <button>
                        Send Message
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" newestOnTop/>
        </div>
    );
};

export default Contact;