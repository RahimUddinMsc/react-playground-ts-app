import React from 'react';
import '../css/Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg"></div>
      
      <div className="hero-content">
        <div className="hero-text visible">
          <h1>
            Build Amazing <span className="gradient-text">Experiences</span>
          </h1>
          <p>Create beautiful, interactive applications with modern design patterns and cutting-edge technology.</p>
          
          <div className="hero-buttons">
            <button className="cta-primary">Get Started</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </div>

        <div className="hero-image">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
