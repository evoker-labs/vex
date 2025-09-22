import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../styles/layout.scss';

function Layout() {
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're using the /app prefix or not
  const isAppPath = location.pathname.startsWith('/app');
  const basePrefix = isAppPath ? '/app' : '';
  
  // Add event handler to handle clicks outside sidebar when expanded on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expanded && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);
  
  const handleLogoClick = () => {
    navigate(isAppPath ? '/app' : '/dashboard');
  };
  
  return (
    <div className={`app-container ${expanded ? 'sidebar-expanded' : ''}`}>
      {/* Left Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`sidebar ${expanded ? 'expanded' : ''}`} 
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="logo" onClick={handleLogoClick}>
          <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150 30L60 180H40L130 30H150Z" fill="#7e57c2"/>
            <path d="M40 70H80L100 30H60L40 70Z" fill="#7e57c2"/>
            <path d="M30 90H70L90 50H50L30 90Z" fill="#7e57c2"/>
            <path d="M20 110H60L80 70H40L20 110Z" fill="#7e57c2"/>
          </svg>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to={`${basePrefix}/dashboard`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span className="nav-label">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`${basePrefix}/users`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="nav-label">Users</span>
              </NavLink>
            </li>
            {/* Review System Navigation */}
            <li className="nav-section-divider">
              <span className="nav-label">Reviews</span>
            </li>
            <li>
              <NavLink to={`${basePrefix}/client-dashboard`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="nav-label">My Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`${basePrefix}/submit-review`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span className="nav-label">Write Review</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`${basePrefix}/business-dashboard`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span className="nav-label">Business</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`${basePrefix}/dao`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.5V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="nav-label">DAO Vote</span>
              </NavLink>
            </li>
            
            {/* Legacy System Navigation */}
            <li className="nav-section-divider">
              <span className="nav-label">Legacy</span>
            </li>
            <li>
              <NavLink to={`${basePrefix}/tickets`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span className="nav-label">Tickets</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`${basePrefix}/new-ticket`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span className="nav-label">New Ticket</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`${basePrefix}/officials`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span className="nav-label">Officials</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`${basePrefix}/settings`} className={({ isActive }) => isActive ? 'active' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span className="nav-label">Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout; 