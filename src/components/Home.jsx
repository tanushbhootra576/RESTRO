import React from 'react';
import Navbar from './Navbar';


const Home = () => {
    return (
        <div id="main" style={{ fontFamily: "'Gill Sans', Calibri, sans-serif" }}>
            <div id="hero">
                <Navbar />
                <div id="hero-content">
                    <h1 id="slogan">
                        "Elevate Your <br />
                        Dining Experience <br />
                        To New Heights <br />
                        At Our Luxurious <br />
                        Restaurant."
                    </h1>
                </div>
            </div>

        </div>
    );
};

export default Home;
