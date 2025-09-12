import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const { getFilteredRecipes, searchTerm } = useRecipeStore();
  const recipes = getFilteredRecipes();

  if (recipes.length === 0) {
    const hasSearchOrFilters = searchTerm.trim() !== '' || 
      Object.values(useRecipeStore.getState().selectedFilters).some(value => value !== null);
    
    return (
      <div className="recipe-list-empty">
        {hasSearchOrFilters ? (
          <div className="no-results">
            <h3>No recipes found</h3>
            <p>Try adjusting your search terms or filters to see more recipes.</p>
            <button 
              onClick={() => useRecipeStore.getState().clearFilters()}
              className="clear-filters-suggestion"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <p>No recipes yet. Add your first recipe above!</p>
        )}
      </div>
    );
  }

  const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.trim()})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="search-highlight">{part}</mark>
      ) : part
    );
  };

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>
          {searchTerm ? 'Search Results' : 'My Recipes'} 
          <span className="recipe-count">({recipes.length})</span>
        </h2>
      </div>
      
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-header">
              <Link to={`/recipe/${recipe.id}`} className="recipe-title-link">
                <h3>{highlightText(recipe.title, searchTerm)}</h3>
              </Link>
              <DeleteRecipeButton 
                recipeId={recipe.id} 
                showText={false}
              />
            </div>
            
            <p className="recipe-description">
              {highlightText(recipe.description, searchTerm)}
            </p>
            
            {/* Show matching ingredients if search term matches */}
            {searchTerm && recipe.ingredients && (
              (() => {
                const matchingIngredients = recipe.ingredients.filter(ingredient =>
                  ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                );
                return matchingIngredients.length > 0 ? (
                  <div className="matching-ingredients">
                    <strong>Matching ingredients:</strong>
                    <ul>
                      {matchingIngredients.slice(0, 3).map((ingredient, index) => (
                        <li key={index}>{highlightText(ingredient, searchTerm)}</li>
                      ))}
                      {matchingIngredients.length > 3 && (
                        <li className="more-items">
                          +{matchingIngredients.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                ) : null;
              })()
            )}
            
            {(recipe.prepTime || recipe.cookingTime || recipe.servings) && (
              <div className="recipe-quick-info">
                {recipe.prepTime && (
                  <span className="info-item">⏱️ {recipe.prepTime}m prep</span>
                )}
                {recipe.cookingTime && (
                  <span className="info-item">🔥 {recipe.cookingTime}m cook</span>
                )}
                {recipe.servings && (
                  <span className="info-item">👥 {recipe.servings} servings</span>
                )}
              </div>
            )}

            <div className="recipe-card-actions">
              <Link to={`/recipe/${recipe.id}`} className="view-details-btn">
                View Details →
              </Link>
            </div>
            
            <div className="recipe-meta">
              <small>Recipe ID: {recipe.id}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
