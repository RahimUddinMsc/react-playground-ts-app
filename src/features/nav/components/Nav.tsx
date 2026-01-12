import React, { useState, useEffect } from 'react';
import '../css/Nav.css';
import { useNav } from '../hooks/useNav';
import { NavLinks } from '../interfaces';
import { NavLink } from 'react-router-dom';

const links: NavLinks[] = [  // Fixed: NavLink → NavLinks (matches your import)
  { href: '/', label: 'Home' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
  { href: '/Dashboard', label: 'Dashboard' }
];

const Nav: React.FC = () => {
  const { isScrolled } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    return () => setMobileOpen(false);
  }, []);

  return (
    <nav className="nav-container">
      <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <h2 className="logo">TechNova</h2>
          <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
            {links.map((link, index) => (
              <li key={link.href} style={{ animationDelay: `${index * 0.1}s` }}>
                <NavLink 
                  to={link.href}  // Changed: href → to
                  className={({ isActive }) => 
                    `nav-link ${isActive || activeLink === link.href.replace('/', '') ? 'active' : ''}`
                  }
                  onClick={() => {
                    setActiveLink(link.href.replace('/', ''));
                    setMobileOpen(false);
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button className="glass-button">Sign In</button>
          </div>
        </div>
        
        <button className={`hamburger ${mobileOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
