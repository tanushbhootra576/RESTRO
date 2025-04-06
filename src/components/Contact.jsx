import React from 'react';
import Navbar from './Navbar';
import './Contact.css';

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p>We’d love to hear from you! Whether you have a question about reservations, feedback, or anything else—our team is ready to answer all your questions.</p>

                <div className="contact-wrapper">
                    <form className="contact-form">
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <input type="tel" placeholder="Phone Number" />
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>

                    <div className="contact-info">
                        <h3>Visit Us</h3>
                        <p>The Restro Restaurant</p>
                        <p>123 Foodie Street, Gourmet City, India</p>
                        <p><strong>Phone:</strong> +91 98765 43210</p>
                        <p><strong>Email:</strong> info@restro.com</p>
                        <h4>Follow Us</h4>

                        <div className="social-links">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" />
                                Instagram
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook" />
                                Facebook
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384017.png" alt="Twitter" />
                                Twitter
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
