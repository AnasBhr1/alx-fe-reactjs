import { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import './Search.css';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Don't search if username is empty
    if (!username.trim()) {
      return;
    }

    // Reset states
    setLoading(true);
    setError(false);
    setUserData(null);

    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
    } catch (err) {
      setError(true);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (loading) {
      return <div className="message loading">Loading...</div>;
    }

    if (error) {
      return <div className="message error">Looks like we cant find the user</div>;
    }

    if (userData) {
      return (
        <div className="user-result">
          <div className="user-avatar">
            <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          </div>
          <div className="user-info">
            <h3 className="user-name">{userData.name || userData.login}</h3>
            <p className="user-login">@{userData.login}</p>
            {userData.bio && <p className="user-bio">{userData.bio}</p>}
            <div className="user-stats">
              <span className="stat">
                <strong>{userData.public_repos || 0}</strong> repositories
              </span>
              <span className="stat">
                <strong>{userData.followers || 0}</strong> followers
              </span>
              <span className="stat">
                <strong>{userData.following || 0}</strong> following
              </span>
            </div>
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="search-container">
      <form onSubmit={handleFormSubmit} className="search-form">
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username..."
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="results-container">
        {renderResults()}
      </div>
    </div>
  );
};

export default Search;