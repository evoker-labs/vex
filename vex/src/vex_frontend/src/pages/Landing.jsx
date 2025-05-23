import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.scss';

function Landing() {
  const [activeSection, setActiveSection] = useState('hero');
  const [imgError, setImgError] = useState({
    laptop: false,
    avatar1: false,
    avatar2: false,
    avatar3: false
  });

  const handleImgError = (img) => {
    setImgError(prev => ({...prev, [img]: true}));
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80;
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="landing-page">
      {/* Floating Logo and Navigation */}
      <div className="floating-logo-container">
        <div className="floating-logo">
          <div className="logo-icon" onClick={() => scrollToSection('hero')}>
            <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M150 30L60 180H40L130 30H150Z" fill="#7e57c2"/>
              <path d="M40 70H80L100 30H60L40 70Z" fill="#7e57c2"/>
              <path d="M30 90H70L90 50H50L30 90Z" fill="#7e57c2"/>
              <path d="M20 110H60L80 70H40L20 110Z" fill="#7e57c2"/>
            </svg>
          </div>
          <div className="floating-nav">
            <button 
              className={activeSection === 'features' ? 'active' : ''} 
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>
            <button 
              className={activeSection === 'how-it-works' ? 'active' : ''} 
              onClick={() => scrollToSection('how-it-works')}
            >
              How It Works
            </button>
            <button 
              className={activeSection === 'collaborators' ? 'active' : ''} 
              onClick={() => scrollToSection('collaborators')}
            >
              Team
            </button>
            <Link to="/dashboard" className="dashboard-button">Dashboard</Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <section id="hero" className="hero-banner">
          <div className="hero-left">
            <div className="hero-content-box">
              <div className="ticket-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.5 5H7.5C5.5 5 4 6.5 4 8.5V41.5C4 43.5 5.5 45 7.5 45H42.5C44.5 45 46 43.5 46 41.5V8.5C46 6.5 44.5 5 42.5 5Z" fill="#FFC266" stroke="#FFC266" strokeWidth="2"/>
                  <path d="M46 15H4M16 5V15M34 5V15M12 25H38M12 35H30" stroke="#FFF" strokeWidth="2"/>
                  <circle cx="46" cy="46" r="10" fill="#7e57c2"/>
                  <path d="M46 41V51M41 46H51" stroke="#FFF" strokeWidth="2"/>
                </svg>
              </div>
              <h1>TICKET<br/>SYSTEM</h1>
              <p className="contact-info">
                Experience a modern ticket management system with advanced security and analytics.
              </p>
              <div className="hero-cta">
                <Link to="/dashboard" className="hero-button">Go to Dashboard</Link>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <img 
              src={imgError.laptop ? "https://via.placeholder.com/600x400/7e57c2/ffffff?text=VEX+Dashboard" : "/images/laptop-mockup.svg"} 
              alt="VEX Ticket System Dashboard" 
              className="laptop-mockup"
              onError={() => handleImgError('laptop')}
            />
          </div>
        </section>

        <section id="features" className="features">
          <h2 className={`section-title ${activeSection === 'features' ? 'active' : ''}`}>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <h3>Ticket Management</h3>
              <p>Full lifecycle management of support requests with automated state transitions (Open → In Progress → Closed). Includes atomic transactions with rollback states for reliability.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Advanced Security</h3>
              <p>End-to-end encryption for private tickets with AES-256 using the ic-crypto library. Role-based access control (RBAC) ensures unauthorized ticket access is prevented.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
              <h3>Intuitive Dashboard</h3>
              <p>Modern, clean design with a focus on usability and accessibility. Collapsible sidebar navigation and responsive layout adapt to any device size with sub-second response times.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                  <path d="M12 2a10 10 0 0 1 10 10h-10V2z"></path>
                  <path d="M12 22a10 10 0 0 1-10-10h10v10z"></path>
                  <path d="M12 22a10 10 0 0 0 10-10h-10v10z"></path>
                </svg>
              </div>
              <h3>Analytics Engine</h3>
              <p>Lightweight heuristics for predictions and trend analysis. On-chain analytics processing with rule-based systems that avoid heavy computation while providing actionable insights.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works">
          <h2 className={`section-title ${activeSection === 'how-it-works' ? 'active' : ''}`}>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>ICP Authentication</h3>
              <p>Users log in with secure Internet Identity, providing self-sovereign authentication with zero password storage and full canister integration.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Canister Processing</h3>
              <p>Modular canister design routes tickets through dedicated microservices with atomic transactions and robust sharding for horizontal scaling.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>On-Chain Analytics</h3>
              <p>All ticket data is processed through rule-based analytics to predict response times, identify bottlenecks, and build knowledge bases in real-time.</p>
            </div>
          </div>
        </section>

        <section id="collaborators" className="collaborators">
          <h2 className={`section-title ${activeSection === 'collaborators' ? 'active' : ''}`}>Our Team</h2>
          <div className="collaborators-grid team-inline">
            <div className="collaborator-card">
              <div className="collaborator-avatar">
                <img 
                  src="https://avatars.githubusercontent.com/u/70056727?v=4" 
                  alt="Rafael Coutinho"
                  onError={() => handleImgError('avatar1')}
                />
              </div>
              <h3>Rafael Coutinho</h3>
              <p>Computer Artist</p>
              <p className="bio">"I'm not a software engineer. I'm a computer artist. Menor atribulado"</p>
              <div className="social-links">
                <a href="https://github.com/c0utin" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>
            <div className="collaborator-card">
              <div className="collaborator-avatar">
                <img 
                  src={imgError.avatar2 ? "https://via.placeholder.com/100/7e57c2/ffffff?text=MR" : "/images/avatar2.svg"} 
                  alt="Maya Rodriguez"
                  onError={() => handleImgError('avatar2')}
                />
              </div>
              <h3>Maya Rodriguez</h3>
              <p>UI/UX Designer</p>
              <p className="bio">Expert in creating intuitive interfaces with modern, clean design focused on usability and accessibility.</p>
              <div className="social-links">
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>
            <div className="collaborator-card">
              <div className="collaborator-avatar">
                <img 
                  src={imgError.avatar3 ? "https://via.placeholder.com/100/7e57c2/ffffff?text=SP" : "/images/avatar3.svg"} 
                  alt="Sam Patel"
                  onError={() => handleImgError('avatar3')}
                />
              </div>
              <h3>Sam Patel</h3>
              <p>Backend Engineer</p>
              <p className="bio">Specializes in high-performance distributed systems using Motoko and Rust for performance-critical modules.</p>
              <div className="social-links">
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

        <section id="documentation" className="cta-section">
          <div className="cta-section-content">
            <h2 className={activeSection === 'documentation' ? 'active' : ''}>Enterprise-grade ticket management on ICP</h2>
            <p>VEX combines the power of Internet Computer Protocol with modern UI design to create a secure, scalable ticket system. Experience sub-second response times, end-to-end encryption, and advanced analytics all in one platform.</p>
            <Link to="/dashboard" className="cta-button">Launch Dashboard</Link>
          </div>
        </section>

        <footer className="landing-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <svg width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M150 30L60 180H40L130 30H150Z" fill="#7e57c2"/>
                <path d="M40 70H80L100 30H60L40 70Z" fill="#7e57c2"/>
                <path d="M30 90H70L90 50H50L30 90Z" fill="#7e57c2"/>
                <path d="M20 110H60L80 70H40L20 110Z" fill="#7e57c2"/>
              </svg>
              <span>VEX</span>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tickets">Tickets</Link>
                <Link to="/users">Users</Link>
                <Link to="/analytics">Analytics</Link>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <Link to="/docs" id="documentation-link">Documentation</Link>
                <button onClick={() => scrollToSection('features')} className="footer-scroll-button" data-section="features">Features</button>
                <button onClick={() => scrollToSection('how-it-works')} className="footer-scroll-button" data-section="how-it-works">Architecture</button>
                <Link to="/api">API Reference</Link>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <button onClick={() => scrollToSection('hero')} className="footer-scroll-button" data-section="hero">About</button>
                <button onClick={() => scrollToSection('collaborators')} className="footer-scroll-button" data-section="collaborators">Team</button>
                <a href="mailto:aymunsaif.18@gmail.com">Contact Us</a>
                <Link to="/privacy">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 VEX Ticket System. Built on Internet Computer Protocol. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landing; 