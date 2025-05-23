import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.scss';

function Landing() {
  useEffect(() => {
    // Add IntersectionObserver for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">
          <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150 30L60 180H40L130 30H150Z" fill="#7e57c2"/>
            <path d="M40 70H80L100 30H60L40 70Z" fill="#7e57c2"/>
            <path d="M30 90H70L90 50H50L30 90Z" fill="#7e57c2"/>
            <path d="M20 110H60L80 70H40L20 110Z" fill="#7e57c2"/>
          </svg>
          <span>VEX</span>
        </div>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#collaborators">Collaborators</a>
          <Link to="/docs">Documentation</Link>
        </nav>
        <Link to="/dashboard" className="dashboard-btn">Go to Dashboard</Link>
      </header>

      <section className="hero">
        <div className="hero-content animate-on-scroll">
          <h1>VEX Ticket System</h1>
          <p>A powerful, modern solution for managing support tickets and requests</p>
          <Link to="/dashboard" className="cta-button">Get Started</Link>
        </div>
        <div className="hero-image animate-on-scroll">
          <img src="/images/laptop-mockup.svg" alt="VEX Ticket System Dashboard" />
        </div>
      </section>

      <section id="features" className="features">
        <h2 className="section-title animate-on-scroll">Features</h2>
        <div className="features-grid">
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <h3>Ticket Management</h3>
            <p>Create, track, and manage all your support tickets in one place with an intuitive interface.</p>
          </div>
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3>User Management</h3>
            <p>Easily add, edit, and manage user accounts with role-based permissions.</p>
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
            <p>Get a comprehensive overview of all ticket activities with our responsive and clean dashboard.</p>
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
            <h3>Advanced Analytics</h3>
            <p>Track performance metrics and gain insights to improve your support processes.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2 className="section-title animate-on-scroll">How It Works</h2>
        <div className="steps">
          <div className="step animate-on-scroll">
            <div className="step-number">1</div>
            <h3>Create Tickets</h3>
            <p>Users submit tickets with details about their issues or requests through an intuitive form.</p>
          </div>
          <div className="step animate-on-scroll">
            <div className="step-number">2</div>
            <h3>Assign & Prioritize</h3>
            <p>Administrators assign tickets to the right team members and set appropriate priority levels.</p>
          </div>
          <div className="step animate-on-scroll">
            <div className="step-number">3</div>
            <h3>Track & Resolve</h3>
            <p>Teams track progress, communicate with users, and efficiently resolve tickets.</p>
          </div>
        </div>
      </section>

      <section id="collaborators" className="collaborators">
        <h2 className="section-title animate-on-scroll">Collaborators</h2>
        <div className="collaborators-grid">
          <div className="collaborator-card animate-on-scroll">
            <div className="collaborator-avatar">
              <img src="/images/avatar1.svg" alt="Collaborator 1" />
            </div>
            <h3>Alex Johnson</h3>
            <p>Lead Developer</p>
            <div className="social-links">
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
          <div className="collaborator-card animate-on-scroll">
            <div className="collaborator-avatar">
              <img src="/images/avatar2.svg" alt="Collaborator 2" />
            </div>
            <h3>Maya Rodriguez</h3>
            <p>UI/UX Designer</p>
            <div className="social-links">
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
          <div className="collaborator-card animate-on-scroll">
            <div className="collaborator-avatar">
              <img src="/images/avatar3.svg" alt="Collaborator 3" />
            </div>
            <h3>Sam Patel</h3>
            <p>Backend Engineer</p>
            <div className="social-links">
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section animate-on-scroll">
        <h2>Ready to streamline your support process?</h2>
        <p>Get started with VEX Ticket System today.</p>
        <Link to="/dashboard" className="cta-button">Launch Dashboard</Link>
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
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <Link to="/docs">Documentation</Link>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#collaborators">Team</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 VEX Ticket System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing; 