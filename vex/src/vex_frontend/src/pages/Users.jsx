import { useState, useEffect } from 'react';
import { vex_backend } from 'declarations/vex_backend';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      
      await vex_backend.create_user(newUser.name, newUser.email);
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user. Please try again.');
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

  return (
    <div className="users">
      <h1>Users</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="create-user-form">
        <h2>Create New User</h2>
        <form onSubmit={handleCreateUser}>
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
          </div>
          <button type="submit" className="primary-button">Create User</button>
        </form>
      </div>
      
      <div className="users-list">
        <h2>All Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
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
                  <td>{new Date(Number(user.created_at) / 1000000).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)} className="delete-button">Delete</button>
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