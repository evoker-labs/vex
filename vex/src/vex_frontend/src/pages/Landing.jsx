import React, { useState, useEffect } from 'react';
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

  // Enhanced scroll to section function with direct DOM manipulation
  const scrollToSection = (sectionId) => {
    console.log(`Attempting to scroll to section: ${sectionId}`);
    
    try {
      const section = document.getElementById(sectionId);
      
      if (section) {
        console.log(`Found section element: ${sectionId}, section position:`, section.getBoundingClientRect());
        
        // Explicitly calculate the offset
        const navHeight = 70; // Account for the floating nav height
        // Use direct DOM manipulation for more reliable scrolling
        const offsetPosition = section.offsetTop - navHeight;
        
        console.log(`Scrolling to position: ${offsetPosition}`);
        
        // Try multiple scroll methods for cross-browser compatibility
        try {
          // Method 1: window.scrollTo with behavior
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Method 2: Element scrollIntoView as backup
          setTimeout(() => {
            section.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
          
          // Force update active section
          setActiveSection(sectionId);
          
          console.log("Scroll complete");
        } catch (scrollError) {
          console.error("Smooth scroll failed, using fallback:", scrollError);
          // Fallback for older browsers
          window.scrollTo(0, offsetPosition);
        }
      } else {
        console.error(`Section not found: ${sectionId}`);
        console.log("Available sections:", 
          Array.from(document.querySelectorAll('section'))
            .map(s => `${s.id} (${s.offsetTop}px)`).join(', ')
        );
      }
    } catch (error) {
      console.error("Error in scrollToSection:", error);
    }
  };

  // Detect section visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'how-it-works', 'collaborators', 'documentation'];
      const scrollPosition = window.scrollY + 100; // Adding offset to trigger earlier
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Run once on mount to set initial active section
    handleScroll();
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Force purple background on component mount
    document.body.style.backgroundColor = 'black';
    
    // Add a class to help with CSS targeting
    document.body.classList.add('landing-page-active');
    
    // Force update the hero-right element with purple background 
    const forceBackgrounds = () => {
      const heroRight = document.getElementById('heroRight');
      if (heroRight) {
        heroRight.style.backgroundColor = '#7e57c2';
        heroRight.style.background = '#7e57c2';
      }
    };
    
    // Run immediately and then after a short delay to ensure rendering
    forceBackgrounds();
    setTimeout(forceBackgrounds, 100);
    
    // Clean up on unmount
    return () => {
      document.body.classList.remove('landing-page-active');
    };
  }, []);

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
          {/* Black background side */}
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
                Experience a modern ticket management system with advanced security, real-time analytics, and enterprise-grade performance.
              </p>
              <div className="hero-cta">
                <Link to="/dashboard" className="hero-button">Access Dashboard</Link>
              </div>
            </div>
          </div>
          
          {/* Purple background side - with stronger inline styles */}
          <div 
            className="hero-right" 
            id="heroRight"
            style={{
              backgroundColor: '#7e57c2 !important',
              background: '#7e57c2 !important',
              width: '50%',
              height: '100vh',
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 1
            }}
          >
            <div className="icp-logo-background">
              <svg className="infinity-logo" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
                    <stop offset="50%" stopColor="rgba(189, 147, 249, 0.9)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="20" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path d="M400 100 C250 100, 200 300, 300 300 C400 300, 450 100, 600 100 C750 100, 800 300, 700 300 C600 300, 550 100, 400 100" 
                      fill="none" 
                      stroke="url(#infinityGradient)" 
                      strokeWidth="30" 
                      strokeLinecap="round"
                      filter="url(#glow)" 
                      className="infinity-path" />
              </svg>
            </div>
            <div className="laptop-container">
              <svg className="laptop-mockup" width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                {/* Laptop body - outer shell */}
                <rect x="60" y="20" width="480" height="290" rx="10" ry="10" fill="#222" stroke="#444" strokeWidth="2" />
                
                {/* Screen inner - purple background */}
                <rect x="80" y="40" width="440" height="250" rx="3" ry="3" fill="#7e57c2" />
                
                {/* Dashboard UI elements */}
                <rect x="100" y="60" width="400" height="40" rx="5" ry="5" fill="#9575cd" />
                
                {/* Navigation sidebar */}
                <rect x="100" y="60" width="60" height="210" rx="0" ry="0" fill="#673ab7" />
                
                {/* Sidebar icons */}
                <rect x="115" y="80" width="30" height="30" rx="15" ry="15" fill="#9575cd" opacity="0.8" />
                <rect x="115" y="130" width="30" height="30" rx="15" ry="15" fill="#9575cd" opacity="0.8" />
                <rect x="115" y="180" width="30" height="30" rx="15" ry="15" fill="#9575cd" opacity="0.8" />
                <rect x="115" y="230" width="30" height="30" rx="15" ry="15" fill="#9575cd" opacity="0.8" />
                
                {/* Main content - header */}
                <rect x="170" y="70" width="300" height="40" rx="3" ry="3" fill="#ffffff" opacity="0.9" />
                
                {/* Card items */}
                <rect x="180" y="130" width="140" height="70" rx="5" ry="5" fill="#ffffff" opacity="0.95" />
                <rect x="330" y="130" width="140" height="70" rx="5" ry="5" fill="#ffffff" opacity="0.95" />
                <rect x="180" y="210" width="140" height="70" rx="5" ry="5" fill="#ffffff" opacity="0.95" />
                <rect x="330" y="210" width="140" height="70" rx="5" ry="5" fill="#ffffff" opacity="0.95" />
                
                {/* Status indicators */}
                <circle cx="500" cy="80" r="10" fill="#BB86FC" />
                <circle cx="205" cy="165" r="5" fill="#4CAF50" />
                <circle cx="355" cy="165" r="5" fill="#FFC107" />
                <circle cx="205" cy="245" r="5" fill="#F44336" />
                <circle cx="355" cy="245" r="5" fill="#2196F3" />
                
                {/* Laptop base */}
                <path d="M20 310 L580 310 L540 370 L60 370 Z" fill="#333" stroke="#444" strokeWidth="1" />
                
                {/* Touchpad */}
                <rect x="250" y="330" width="100" height="20" rx="3" ry="3" fill="#555" />
                
                {/* Add button */}
                <circle cx="500" cy="230" r="20" fill="#BB86FC" />
                <path d="M500 222 L500 238 M492 230 L508 230" stroke="white" strokeWidth="3" />
              </svg>
            </div>
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
          
          {/* Blockchain visualization */}
          <div className="blockchain-visual">
            <svg className="blockchain-illustration" viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg">
              {/* Chain background */}
              <g className="chain-background">
                <rect x="50" y="70" width="900" height="60" rx="30" fill="#f5f5f5" />
              </g>
              
              {/* Blockchain nodes */}
              <g className="blockchain-nodes">
                <rect x="100" y="60" width="80" height="80" rx="10" fill="#7e57c2" className="block" />
                <rect x="250" y="60" width="80" height="80" rx="10" fill="#7e57c2" className="block" />
                <rect x="400" y="60" width="80" height="80" rx="10" fill="#7e57c2" className="block" />
                <rect x="550" y="60" width="80" height="80" rx="10" fill="#7e57c2" className="block" />
                <rect x="700" y="60" width="80" height="80" rx="10" fill="#7e57c2" className="block" />
                <rect x="850" y="60" width="80" height="80" rx="10" fill="#7e57c2" className="block" />
              </g>
              
              {/* Connection lines */}
              <g className="connection-lines" stroke="#9575cd" strokeWidth="3" strokeDasharray="5,5">
                <line x1="180" y1="100" x2="250" y2="100" />
                <line x1="330" y1="100" x2="400" y2="100" />
                <line x1="480" y1="100" x2="550" y2="100" />
                <line x1="630" y1="100" x2="700" y2="100" />
                <line x1="780" y1="100" x2="850" y2="100" />
              </g>
              
              {/* Node icons */}
              <g className="node-icons" fill="white">
                <text x="140" y="105" fontSize="30" textAnchor="middle">ID</text>
                <text x="290" y="105" fontSize="30" textAnchor="middle">TX</text>
                <text x="440" y="105" fontSize="30" textAnchor="middle">🔒</text>
                <text x="590" y="105" fontSize="30" textAnchor="middle">📊</text>
                <text x="740" y="105" fontSize="30" textAnchor="middle">✓</text>
                <text x="890" y="105" fontSize="30" textAnchor="middle">📱</text>
              </g>
            </svg>
            
            <div className="blockchain-labels">
              <div className="label">Authentication</div>
              <div className="label">Transaction</div>
              <div className="label">Encryption</div>
              <div className="label">Analytics</div>
              <div className="label">Validation</div>
              <div className="label">Interface</div>
            </div>
          </div>
          
          <div className="steps">
            <div className="step">
              <div className="step-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="#7e57c2" />
                  <circle cx="12" cy="10" r="3" fill="white" />
                  <path d="M12 13C9.5 13 7.5 14.5 7 16.5H17C16.5 14.5 14.5 13 12 13Z" fill="white" />
                </svg>
              </div>
              <h3>ICP Authentication</h3>
              <p>Users log in with secure Internet Identity, providing self-sovereign authentication with zero password storage and full canister integration.</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="#7e57c2" />
                  <rect x="7" y="7" width="4" height="4" rx="1" fill="white" />
                  <rect x="13" y="7" width="4" height="4" rx="1" fill="white" />
                  <rect x="7" y="13" width="4" height="4" rx="1" fill="white" />
                  <rect x="13" y="13" width="4" height="4" rx="1" fill="white" />
                </svg>
              </div>
              <h3>Canister Processing</h3>
              <p>Modular canister design routes tickets through dedicated microservices with atomic transactions and robust sharding for horizontal scaling.</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="#7e57c2" />
                  <path d="M7 14L10 11L13 14L17 10" stroke="white" strokeWidth="2" />
                  <circle cx="7" cy="14" r="1.5" fill="white" />
                  <circle cx="10" cy="11" r="1.5" fill="white" />
                  <circle cx="13" cy="14" r="1.5" fill="white" />
                  <circle cx="17" cy="10" r="1.5" fill="white" />
                </svg>
              </div>
              <h3>On-Chain Analytics</h3>
              <p>All ticket data is processed through rule-based analytics to predict response times, identify bottlenecks, and build knowledge bases in real-time.</p>
            </div>
          </div>
          
          <div className="workflow-diagram">
            <div className="workflow-step">
              <div className="workflow-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#673ab7" />
                  <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="workflow-content">
                <h4>Ticket Creation</h4>
                <p>User submits ticket which is immediately stored on-chain with a unique identifier</p>
              </div>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="workflow-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#673ab7" />
                  <path d="M12 7V12L15 15" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="workflow-content">
                <h4>Processing</h4>
                <p>Smart contracts route ticket to appropriate handler and update state atomically</p>
              </div>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="workflow-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#673ab7" />
                  <path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="workflow-content">
                <h4>Resolution</h4>
                <p>Ticket is resolved and the transaction is recorded permanently on the blockchain</p>
              </div>
            </div>
          </div>
        </section>

        <section id="collaborators" className="collaborators">
          <h2 className={`section-title ${activeSection === 'collaborators' ? 'active' : ''}`}>Our Team</h2>
          <div className="collaborators-grid team-inline">
            <div className="collaborator-card">
              <div className="collaborator-avatar">
                <img 
                  src="/images/coutin.jpg" 
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
                  src="/images/mister.jpg" 
                  alt="Mister Clayton"
                  onError={() => handleImgError('avatar2')}
                />
              </div>
              <h3>Mister Clayton</h3>
              <p>Backend Engineer</p>
              <p className="bio">Specializes in distributed systems architecture and blockchain development with expertise in Rust and ICP.</p>
              <div className="social-links">
                <a href="https://github.com/misterclayt0n" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
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
              <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M150 30L60 180H40L130 30H150Z" fill="#7e57c2"/>
                <path d="M40 70H80L100 30H60L40 70Z" fill="#7e57c2"/>
                <path d="M30 90H70L90 50H50L30 90Z" fill="#7e57c2"/>
                <path d="M20 110H60L80 70H40L20 110Z" fill="#7e57c2"/>
              </svg>
              <span>VEX Ticket System</span>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>PLATFORM</h4>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tickets">Ticket Management</Link>
                <Link to="/users">User Controls</Link>
                <Link to="/analytics">Analytics Suite</Link>
              </div>
              <div className="footer-column">
                <h4>RESOURCES</h4>
                <Link to="/docs" id="documentation-link">Documentation</Link>
                <button onClick={() => scrollToSection('features')} className="footer-scroll-button" data-section="features">Features Overview</button>
                <button onClick={() => scrollToSection('how-it-works')} className="footer-scroll-button" data-section="how-it-works">Technical Architecture</button>
                <Link to="/api">API Documentation</Link>
              </div>
              <div className="footer-column">
                <h4>COMPANY</h4>
                <button onClick={() => scrollToSection('hero')} className="footer-scroll-button" data-section="hero">About VEX</button>
                <button onClick={() => scrollToSection('collaborators')} className="footer-scroll-button" data-section="collaborators">Our Team</button>
                <a href="mailto:contact@vexsystem.com">Contact Support</a>
                <Link to="/privacy">Privacy & Security</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} VEX Ticket System. All rights reserved.</p>
            </div>
            <div className="footer-powered">
              <p>Built on Internet Computer Protocol</p>
              <img src="/internet-computer-icp-logo.png" alt="Internet Computer Protocol Logo" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landing; 