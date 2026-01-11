import React, { useState, useEffect } from 'react';
import '../css/Nav.css';
import { useNav } from '../hooks/useNav';
import { NavLink } from '../interfaces';

const links: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Solutions' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
];

const Nav: React.FC = () => {
  const { isScrolled } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    return () => setMobileOpen(false); // Close mobile menu on unmount
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav>
        <div className="logo">TechNova</div>
        
        <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
          {links.map((link, index) => (
            <li key={link.href} style={{ animationDelay: `${index * 0.1}s` }}>
              <a 
                href={link.href} 
                className={activeLink === link.href.replace('#', '') ? 'active' : ''}
                onClick={() => {
                  setActiveLink(link.href.replace('#', ''));
                  setMobileOpen(false);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        
        <button className={`hamburger ${mobileOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Nav;
