import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  if (recipes.length === 0) {
    return (
      <div className="recipe-list-empty">
        <p>No recipes yet. Add your first recipe above!</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <h2>My Recipes ({recipes.length})</h2>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-header">
              <Link to={`/recipe/${recipe.id}`} className="recipe-title-link">
                <h3>{recipe.title}</h3>
              </Link>
              <DeleteRecipeButton 
                recipeId={recipe.id} 
                showText={false}
              />
            </div>
            <p className="recipe-description">{recipe.description}</p>
            
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