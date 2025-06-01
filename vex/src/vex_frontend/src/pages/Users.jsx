import { useState, useEffect } from 'react';
import { vex_backend } from 'declarations/vex_backend';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await vex_backend.get_all_users();
      setUsers(allUsers);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      if (!newUser.name || !newUser.email) {
        setError('Name and email are required');
        return;
      }
      
      setIsSubmitting(true);
      await vex_backend.create_user(newUser.name, newUser.email);
      setNewUser({ name: '', email: '' });
      setError(null);
      fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await vex_backend.delete_user(id);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) / 1000000).toLocaleString();
  };

  return (
    <div className="users">
      <h1>Users</h1>
      
      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ marginLeft: 'auto' }}>✕</button>
        </div>
      )}
      
      <div className="create-user-form">
        <h2>Create New User</h2>
        <form onSubmit={handleCreateUser}>
          <div>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              placeholder="Enter user name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="Enter user email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
      
      <div className="users-list">
        <h2>All Users</h2>
        {loading ? (
          <div className="loading-indicator">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loader">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="no-data">
            <p>No users found. Create a new user to get started.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.created_at)}</td>
                  <td>
                    <button 
                      onClick={() => handleDeleteUser(user.id)} 
                      className="delete-button"
                      title="Delete User"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users; 