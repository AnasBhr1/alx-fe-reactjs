import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search GitHub users..."
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;