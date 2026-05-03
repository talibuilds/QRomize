import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Home from './pages/Home';
import FeaturesPage from './pages/FeaturesPage';
import SpiderNetBg from './components/SpiderNetBg';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const gen = document.getElementById('generator');
        if (gen) {
          const yOffset = -80; 
          const y = gen.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      }, 100);
    } else {
      const gen = document.getElementById('generator');
      if (gen) {
        const yOffset = -80; 
        const y = gen.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-wrapper">
      <SpiderNetBg />
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'inherit', textDecoration: 'none' }}>
            <img src={theme === 'dark' ? '/logo-1.png' : '/logo-2.png'} alt="QRomize Logo" />
            QRomize
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/features" className="nav-link" style={location.pathname === '/features' ? { color: 'var(--primary)' } : {}}>
            Features Gallery
          </Link>
          <a href="/#generator" onClick={handleCreateClick} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none', cursor: 'pointer' }}>
            Create QR
          </a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} QRomize. All rights reserved. <br /> Built with ❤️ by <a href="https://github.com/talibuilds">talibuilds</a>.</p>
      </footer>
    </div>
  );
}

export default App;
