import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.scss';

function Landing() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const sectionsRef = useRef({});
  const [pageLoaded, setPageLoaded] = useState(false);
  const [imgError, setImgError] = useState({
    laptop: false,
    avatar1: false,
    avatar2: false,
    avatar3: false
  });

  useEffect(() => {
    // Mark page as loaded
    setPageLoaded(true);
    
    // Enhanced scroll animation with better browser support
    const animateOnScroll = () => {
      // Force all elements to be visible when they enter the viewport
      const elements = document.querySelectorAll('.animate-on-scroll, .animate-title, .animate-fade-in');
      const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(currentPosition);
      
      // Check which section is in view for highlight
      const sections = ['hero', 'features', 'how-it-works', 'collaborators', 'documentation'];
      
      // Find which section is closest to the viewport top
      let closestSection = null;
      let closestDistance = Infinity;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const absDist = Math.abs(rect.top - 80); // 80px is approx. the nav height
          
          if (absDist < closestDistance) {
            closestDistance = absDist;
            closestSection = section;
          }
        }
      });
      
      if (closestSection && closestSection !== activeSection) {
        setActiveSection(closestSection);
        
        // Highlight the section title
        document.querySelectorAll('.section-title').forEach(title => {
          if (title.closest('section') && title.closest('section').id === closestSection) {
            title.classList.add('active');
          } else {
            title.classList.remove('active');
          }
        });
      }
      
      // Auto-reveal elements when they come into view
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.9) {
          element.classList.add('show');
        }
      });
    };

    // Set all sections to auto-reveal
    const enableAllSections = () => {
      document.querySelectorAll('.section-title').forEach(title => {
        if (title.closest('section') && title.closest('section').getBoundingClientRect().top < window.innerHeight) {
          title.classList.add('active');
        }
      });
    };
    
    // Fix for initial animations - force them to appear immediately
    const initializeAnimations = () => {
      // Show all visible elements on load
      document.querySelectorAll('.animate-on-scroll, .animate-title, .animate-fade-in').forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          element.classList.add('show');
        }
      });
      
      // Force the floating logo to be visible
      const floatingLogo = document.querySelector('.floating-logo');
      if (floatingLogo) {
        floatingLogo.classList.add('visible');
      }
      
      // Cache section refs for smooth scrolling
      const sections = ['hero', 'features', 'how-it-works', 'collaborators', 'documentation'];
      sections.forEach(section => {
        sectionsRef.current[section] = document.getElementById(section);
      });
      
      // Check URL hash for direct navigation
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionsRef.current[hash]) {
        setTimeout(() => scrollToSection(hash, true), 500);
      }
      
      // Run first animation check after DOM is fully loaded
      setTimeout(() => {
        animateOnScroll();
        enableAllSections();
      }, 200);
      
      // Force body to be scrollable with no margins
      document.body.style.overflowY = 'scroll';
      document.body.style.height = 'auto';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.documentElement.style.margin = '0';
      document.documentElement.style.padding = '0';
      
      if (document.getElementById('root')) {
        document.getElementById('root').style.margin = '0';
        document.getElementById('root').style.padding = '0';
        document.getElementById('root').style.width = '100vw';
        document.getElementById('root').style.maxWidth = '100%';
      }
      
      // Force landing page to take full width
      const landingPage = document.querySelector('.landing-page');
      if (landingPage) {
        landingPage.style.width = '100vw';
        landingPage.style.maxWidth = '100%';
        landingPage.style.margin = '0';
        landingPage.style.padding = '0';
      }
      
      // Add !important to all margin properties
      document.body.style.cssText += 'margin: 0 !important; padding: 0 !important; overflow-x: hidden !important;';
      document.documentElement.style.cssText += 'margin: 0 !important; padding: 0 !important; overflow-x: hidden !important;';
      
      // Target any landing page elements
      const allElements = document.querySelectorAll('.landing-page, .main-content, section, .features, .how-it-works, .collaborators, .cta-section');
      allElements.forEach(el => {
        el.style.cssText += 'margin-left: 0 !important; padding-left: 0 !important; left: 0 !important; position: relative !important; width: 100vw !important; max-width: 100% !important; box-sizing: border-box !important;';
      });
    };
    
    // Initial animations setup
    initializeAnimations();
    
    // Add scroll event listener with improved throttling
    let ticking = false;
    
    const throttledScrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          animateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Force scroll check when window resizes
    window.addEventListener('resize', throttledScrollHandler, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('resize', throttledScrollHandler);
    };
  }, [activeSection]);

  const scrollToSection = (sectionId, isFromHash = false) => {
    const section = sectionsRef.current[sectionId] || document.getElementById(sectionId);
    if (section) {
      // Update URL hash but prevent it from triggering another scroll
      if (!isFromHash) {
        window.history.pushState(null, null, `#${sectionId}`);
      }
      
      const navHeight = 80; // Account for floating navigation height
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(sectionId);
    }
  };

  const handleImgError = (img) => {
    setImgError(prev => ({...prev, [img]: true}));
  };

  // Update footer buttons to show active state
  useEffect(() => {
    // Update active classes on footer buttons based on current section
    document.querySelectorAll('.footer-scroll-button').forEach(button => {
      if (button.getAttribute('data-section') === activeSection) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }, [activeSection]);

  if (!pageLoaded) {
    return <div className="loading">Loading...</div>;
  }

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
            <div className="hero-decoration">
              <div className="stars">
                <div className="star animate-star"></div>
                <div className="star animate-star"></div>
              </div>
            </div>
            <div className="hero-content-box animate-on-scroll">
              <div className="ticket-icon animate-float">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.5 5H7.5C5.5 5 4 6.5 4 8.5V41.5C4 43.5 5.5 45 7.5 45H42.5C44.5 45 46 43.5 46 41.5V8.5C46 6.5 44.5 5 42.5 5Z" fill="#FFC266" stroke="#FFC266" strokeWidth="2"/>
                  <path d="M46 15H4M16 5V15M34 5V15M12 25H38M12 35H30" stroke="#FFF" strokeWidth="2"/>
                  <circle cx="46" cy="46" r="10" fill="#7e57c2"/>
                  <path d="M46 41V51M41 46H51" stroke="#FFF" strokeWidth="2"/>
                </svg>
              </div>
              <h1 className="animate-title">TICKET<br/>SYSTEM</h1>
              <p className="contact-info animate-fade-in">
                Experience a modern ticket management system with advanced security and analytics.
              </p>
              <div className="hero-cta animate-on-scroll">
                <Link to="/dashboard" className="hero-button">Go to Dashboard</Link>
              </div>
            </div>
          </div>
          <div className="hero-right animate-on-scroll">
            <img 
              src={imgError.laptop ? "https://via.placeholder.com/600x400/7e57c2/ffffff?text=VEX+Dashboard" : "/images/laptop-mockup.svg"} 
              alt="VEX Ticket System Dashboard" 
              className="laptop-mockup"
              onError={() => handleImgError('laptop')}
            />
          </div>
          
          {/* Scroll indicator moved inside hero section */}
          <div id="scroll-indicator" onClick={() => scrollToSection('features')}>
            <div className="arrows">
              <div className="arrow"></div>
              <div className="arrow"></div>
              <div className="arrow"></div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <h2 className={`section-title animate-on-scroll ${activeSection === 'features' ? 'active' : ''}`}>Features</h2>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <h3>Ticket Management</h3>
              <p>Full lifecycle management of support requests with automated state transitions (Open → In Progress → Closed). Includes atomic transactions with rollback states for reliability.</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Advanced Security</h3>
              <p>End-to-end encryption for private tickets with AES-256 using the ic-crypto library. Role-based access control (RBAC) ensures unauthorized ticket access is prevented.</p>
            </div>
            <div className="feature-card animate-on-scroll">
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
            <div className="feature-card animate-on-scroll">
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
          <h2 className={`section-title animate-on-scroll ${activeSection === 'how-it-works' ? 'active' : ''}`}>How It Works</h2>
          <div className="steps">
            <div className="step animate-on-scroll">
              <div className="step-number">1</div>
              <h3>ICP Authentication</h3>
              <p>Users log in with secure Internet Identity, providing self-sovereign authentication with zero password storage and full canister integration.</p>
            </div>
            <div className="step animate-on-scroll">
              <div className="step-number">2</div>
              <h3>Canister Processing</h3>
              <p>Modular canister design routes tickets through dedicated microservices with atomic transactions and robust sharding for horizontal scaling.</p>
            </div>
            <div className="step animate-on-scroll">
              <div className="step-number">3</div>
              <h3>On-Chain Analytics</h3>
              <p>All ticket data is processed through rule-based analytics to predict response times, identify bottlenecks, and build knowledge bases in real-time.</p>
            </div>
          </div>
        </section>

        <section id="collaborators" className="collaborators">
          <h2 className={`section-title animate-on-scroll ${activeSection === 'collaborators' ? 'active' : ''}`}>Our Team</h2>
          <div className="collaborators-grid team-inline">
            <div className="collaborator-card animate-on-scroll">
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
            <div className="collaborator-card animate-on-scroll">
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
            <div className="collaborator-card animate-on-scroll">
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

        <section id="documentation" className="cta-section animate-on-scroll">
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