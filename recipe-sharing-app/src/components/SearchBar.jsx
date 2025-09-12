import { useState, useEffect } from 'react';
import useRecipeStore from '../store/recipeStore';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useRecipeStore();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search input to avoid excessive filtering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, setSearchTerm]);

  // Sync with store when store changes (e.g., when filters are cleared)
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          placeholder="Search recipes, ingredients, or instructions..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="search-input"
        />
        {localSearchTerm && (
          <button
            onClick={handleClearSearch}
            className="clear-search-btn"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="search-info">
          <span className="search-term-indicator">
            Searching for: "<strong>{searchTerm}</strong>"
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;