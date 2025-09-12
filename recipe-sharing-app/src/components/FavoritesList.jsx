import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import FavoriteButton from './FavoriteButton';
import DeleteRecipeButton from './DeleteRecipeButton';

const FavoritesList = () => {
  const { getFavoriteRecipes } = useRecipeStore();
  const favoriteRecipes = getFavoriteRecipes();

  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-list-empty">
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h3>No favorite recipes yet</h3>
          <p>Start exploring recipes and click the heart icon to save your favorites!</p>
          <Link to="/" className="browse-recipes-btn">
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <h2>My Favorite Recipes</h2>
        <div className="favorites-count">
          <span>{favoriteRecipes.length} favorite{favoriteRecipes.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="favorites-grid">
        {favoriteRecipes.map(recipe => (
          <div key={recipe.id} className="favorite-recipe-card">
            <div className="recipe-header">
              <Link to={`/recipe/${recipe.id}`} className="recipe-title-link">
                <h3>{recipe.title}</h3>
              </Link>
              <div className="recipe-actions">
                <FavoriteButton recipeId={recipe.id} size="small" />
                <DeleteRecipeButton 
                  recipeId={recipe.id} 
                  showText={false}
                />
              </div>
            </div>
            
            <p className="recipe-description">{recipe.description}</p>
            
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="recipe-tags">
                {recipe.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="recipe-tag">{tag}</span>
                ))}
                {recipe.tags.length > 4 && (
                  <span className="more-tags">+{recipe.tags.length - 4}</span>
                )}
              </div>
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
                View Recipe →
              </Link>
              {recipe.difficulty && (
                <span className={`difficulty-badge difficulty-${recipe.difficulty}`}>
                  {recipe.difficulty}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;