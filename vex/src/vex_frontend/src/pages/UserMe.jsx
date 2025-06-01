import { useState, useEffect } from 'react';
import { vex_backend } from 'declarations/vex_backend';

function UserMe() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // For demo purposes, we'll assume user ID 1 is the current user
  // In a real app, you would get the current user ID from authentication
  const currentUserId = 1;

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const userData = await vex_backend.get_user(currentUserId);
      
      if (userData) {
        setUser(userData);
        setFormData({ 
          name: userData.name, 
          email: userData.email 
        });
      } else {
        // If user doesn't exist yet, create a default one
        handleCreateDefaultUser();
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to load user profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDefaultUser = async () => {
    try {
      const result = await vex_backend.create_user('Default User', 'default@example.com');
      if (result.Ok) {
        setUser(result.Ok);
        setFormData({ 
          name: result.Ok.name, 
          email: result.Ok.email 
        });
      }
    } catch (err) {
      console.error('Error creating default user:', err);
      setError('Failed to create default user. Please try again.');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const result = await vex_backend.update_user(
        currentUserId,
        formData.name !== user.name ? formData.name : null,
        formData.email !== user.email ? formData.email : null
      );
      
      if (result.Ok) {
        setUser(result.Ok);
        setEditing(false);
      } else if (result.Err) {
        setError(result.Err);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="user-me"><p>Loading profile...</p></div>;
  }

  return (
    <div className="user-me">
      <h1>My Profile</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      {user && !editing ? (
        <div className="profile-details">
          <div className="profile-field">
            <label>Name:</label>
            <span>{user.name}</span>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="profile-field">
            <label>Created At:</label>
            <span>{new Date(Number(user.created_at) / 1000000).toLocaleString()}</span>
          </div>
          <button onClick={() => setEditing(true)} className="primary-button">Edit Profile</button>
        </div>
      ) : (
        <form className="edit-profile-form" onSubmit={handleUpdateProfile}>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="primary-button">Save Changes</button>
            <button type="button" onClick={() => setEditing(false)} className="delete-button">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserMe; 