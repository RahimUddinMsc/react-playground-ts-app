import React from 'react';
import '../css/Solutions.css';
import { useRadialMenuContext } from '../../contextMenu/RadialMenuContext';

const Solutions: React.FC = () => {
  const { openMenu } = useRadialMenuContext();

  const solutions = [
    { id: 1, title: 'Solution 1', description: 'Description here' },
    { id: 2, title: 'Solution 2', description: 'Description here' },
    { id: 3, title: 'Solution 3', description: 'Description here' },
  ];

  return (
    <section className="solutions" id="services">
      <div className="container">
        <div className="solutions-header">
          <h2>Our Solutions</h2>
          <p className="solutions-subtitle">Innovative solutions tailored for your needs</p>
        </div>

        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <div 
              key={solution.id}
              className="solution-card"
              onContextMenu={(e) => {
                e.preventDefault();
                const card = e.currentTarget as HTMLElement;
                openMenu(e.clientX, e.clientY, `solution-${index}`, () => {
                  card.remove();
                });
              }}
            >
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <button className="glass-button">Learn More</button>
            </div>
          ))}
        </div>

        <button 
          className="learn-more-btn" 
          data-context-func={`context-btn-remove-all`}
          style={{
            display: 'none',
            zIndex: -1
          }}
          onClick={() => {
            const grid = document.querySelector('.solutions-grid') as HTMLElement;
            if (grid) grid.remove();
          }}
        >
          Remove All
        </button>
      </div>
    </section>
  );
};

export default Solutions;
