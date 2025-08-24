import React from 'react';
import Navbar from './Navbar';
import TopPicks from './TopPicks';
import './Home.css';

const Home = () => {
    return (
        <div id="main">
            {/* Hero Section */}
            <div id="hero">
                <Navbar />
                <div id="hero-overlay">
                    <div id="hero-content">
                        <h1 id="slogan">Elevate Your Dining Experience</h1>
                        <p className="hero-tagline">
                            Discover luxury dining, world-class cuisine, and unforgettable moments at <span className="brand">Restro</span>.
                        </p>
                        <a href="/menu" className="cta-btn">Explore Our Menu</a>
                    </div>
                </div>
            </div>

            {/* Top Picks Section */}
            <section className="section">
                <TopPicks />
            </section>
        </div>
    );
};

export default Home;
