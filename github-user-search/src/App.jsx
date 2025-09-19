import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import { githubService } from './services/githubService';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    
    try {
      const data = await githubService.searchUsers(query);
      setUsers(data.items || []);
      setTotalCount(data.total_count || 0);
    } catch (err) {
      setError(err.message);
      setUsers([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">GitHub User Search</h1>
          <p className="app-description">
            Discover and explore GitHub users and their profiles
          </p>
        </div>
      </header>
      
      <main className="app-main">
        <div className="container">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
          <UserList 
            users={users}
            loading={loading}
            error={error}
            totalCount={totalCount}
            searchQuery={searchQuery}
          />
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>Built with React & GitHub API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;