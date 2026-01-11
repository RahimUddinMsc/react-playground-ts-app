import React from 'react';
import '../css/Hero.css';
import { useHero } from '../hooks/useHero';

const Hero: React.FC = () => {
  const { isVisible } = useHero();

  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className={`hero-text ${isVisible ? 'visible' : ''}`}>
          <h1>
            Digital <span className="gradient-text">Innovation</span>
            <br /> Studio
          </h1>
          <p>
            We craft cutting-edge software solutions that drive business growth 
            and transform industries. AI, cloud, mobile - we build the future.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="cta-primary">Start Project</a>
            <a href="#services" className="cta-secondary">View Work</a>
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
