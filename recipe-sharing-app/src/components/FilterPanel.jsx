import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const FilterPanel = () => {
  const { selectedFilters, setFilters, sortBy, setSortBy, clearFilters, getFilteredRecipes } = useRecipeStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const filteredCount = getFilteredRecipes().length;
  const totalCount = useRecipeStore(state => state.recipes.length);

  const handleFilterChange = (filterKey, value) => {
    const numValue = value === '' ? null : parseInt(value);
    setFilters({ [filterKey]: numValue });
  };

  const hasActiveFilters = () => {
    return Object.values(selectedFilters).some(value => value !== null) || 
           useRecipeStore.getState().searchTerm.trim() !== '';
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <div className="filter-summary">
          <h3>Filters & Sort</h3>
          <div className="results-count">
            {filteredCount === totalCount ? (
              <span>Showing all {totalCount} recipes</span>
            ) : (
              <span>Showing {filteredCount} of {totalCount} recipes</span>
            )}
          </div>
        </div>
        
        <div className="filter-controls">
          {hasActiveFilters() && (
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All
            </button>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="expand-filters-btn"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
            <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="filter-content">
          <div className="filter-section">
            <label className="filter-label">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="title">Recipe Name (A-Z)</option>
              <option value="newest">Newest First</option>
              <option value="prepTime">Prep Time (Shortest)</option>
              <option value="cookingTime">Cooking Time (Shortest)</option>
              <option value="servings">Servings (Least)</option>
            </select>
          </div>

          <div className="filter-grid">
            <div className="filter-group">
              <label className="filter-label">Max Prep Time (minutes)</label>
              <input
                type="number"
                placeholder="e.g., 30"
                value={selectedFilters.maxPrepTime || ''}
                onChange={(e) => handleFilterChange('maxPrepTime', e.target.value)}
                className="filter-input"
                min="0"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Max Cooking Time (minutes)</label>
              <input
                type="number"
                placeholder="e.g., 60"
                value={selectedFilters.maxCookingTime || ''}
                onChange={(e) => handleFilterChange('maxCookingTime', e.target.value)}
                className="filter-input"
                min="0"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Min Servings</label>
              <input
                type="number"
                placeholder="e.g., 2"
                value={selectedFilters.minServings || ''}
                onChange={(e) => handleFilterChange('minServings', e.target.value)}
                className="filter-input"
                min="1"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Max Servings</label>
              <input
                type="number"
                placeholder="e.g., 8"
                value={selectedFilters.maxServings || ''}
                onChange={(e) => handleFilterChange('maxServings', e.target.value)}
                className="filter-input"
                min="1"
              />
            </div>
          </div>

          <div className="active-filters">
            <h4>Active Filters:</h4>
            <div className="filter-tags">
              {useRecipeStore.getState().searchTerm && (
                <span className="filter-tag">
                  Search: "{useRecipeStore.getState().searchTerm}"
                </span>
              )}
              {selectedFilters.maxPrepTime && (
                <span className="filter-tag">
                  Prep ≤ {selectedFilters.maxPrepTime}min
                </span>
              )}
              {selectedFilters.maxCookingTime && (
                <span className="filter-tag">
                  Cook ≤ {selectedFilters.maxCookingTime}min
                </span>
              )}
              {selectedFilters.minServings && (
                <span className="filter-tag">
                  Serves ≥ {selectedFilters.minServings}
                </span>
              )}
              {selectedFilters.maxServings && (
                <span className="filter-tag">
                  Serves ≤ {selectedFilters.maxServings}
                </span>
              )}
              {!hasActiveFilters() && (
                <span className="no-filters">No active filters</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;