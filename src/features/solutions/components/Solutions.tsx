import React from 'react';
import '../css/Solutions.css';
import { useSolutions } from '../hooks/useSolutions';
import { Solution } from '../interfaces';

const solutions: Solution[] = [
  { 
    icon: '🚀', 
    title: 'Custom Software', 
    description: 'Tailored applications solving unique business challenges with scalable, maintainable architecture.' 
  },
  { 
    icon: '🤖', 
    title: 'AI & Machine Learning', 
    description: 'Intelligent systems that learn from data to deliver actionable insights and automation.' 
  },
  { 
    icon: '☁️', 
    title: 'Cloud Solutions', 
    description: 'Secure, scalable infrastructure optimized for performance and cost-efficiency.' 
  },
  { 
    icon: '📱', 
    title: 'Mobile Applications', 
    description: 'Native & cross-platform experiences for iOS and Android that engage users.' 
  },
];

const Solutions: React.FC = () => {
  const { inView } = useSolutions();

  return (
    <section className="solutions" id="services">
      <div className="container">
        <h2 className="section-title">Our Solutions</h2>
        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className={`solution-card ${inView ? 'visible' : ''}`}
              style={{ 
                        '--delay': `${index * 0.1}s` 
                    } as React.CSSProperties}  // ✅ FIXED
            >
              <div className="solution-icon">{solution.icon}</div>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
