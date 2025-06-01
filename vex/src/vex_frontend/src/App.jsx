import { useState } from 'react';
import { vex_backend } from 'declarations/vex_backend';
import { Outlet, NavLink } from 'react-router-dom';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    vex_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <div className="app-container">
      <header>
        <img src="/logo2.svg" alt="DFINITY logo" />
        <h1>Vex Application</h1>
      </header>
      
      <div className="main-content">
        <nav className="sidebar">
          <ul>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/tickets">Tickets</NavLink></li>
            <li><NavLink to="/new-tickets">New Tickets</NavLink></li>
            <li><NavLink to="/officials">Officials</NavLink></li>
            <li><NavLink to="/user-me">My Profile</NavLink></li>
            <li><NavLink to="/hello">Hello ICP</NavLink></li>
          </ul>
        </nav>
        
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
