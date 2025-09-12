import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import FavoriteButton from './FavoriteButton';

const RecommendationsList = () => {
  const { getRecommendations, favorites, userPreferences } = useRecipeStore();
  const [recommendations, setRecommendations] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update recommendations when favorites change
  useEffect(() => {
    const newRecommendations = getRecommendations();
    setRecommendations(newRecommendations);
  }, [favorites.length, getRecommendations]);

  const handleRefreshRecommendations = async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newRecommendations = getRecommendations();
    setRecommendations(newRecommendations);
    setIsRefreshing(false);
  };

  if (favorites.length === 0) {
    return (
      <div className="recommendations-empty">
        <div className="empty-state">
          <div className="empty-icon">🤖</div>
          <h3>No recommendations yet</h3>
          <p>Add some recipes to your favorites and we'll suggest similar ones you might like!</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-empty">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No new recommendations</h3>
          <p>You've favorited all the recipes we'd recommend! Try adding more recipes or check back later.</p>
        </div>
      </div>
    );
  }

  const getRecommendationReason = (recipe) => {
    const favoriteRecipes = favorites
      .map(id => useRecipeStore.getState().recipes.find(r => r.id === id))
      .filter(Boolean);

    // Check for common tags
    const commonTags = [];
    favoriteRecipes.forEach(favRecipe => {
      if (favRecipe.tags && recipe.tags) {
        const matching = favRecipe.tags.filter(tag => recipe.tags.includes(tag));
        commonTags.push(...matching);
      }
    });

    if (commonTags.length > 0) {
      const uniqueTags = [...new Set(commonTags)];
      return `Because you like ${uniqueTags.slice(0, 2).join(' and ')} recipes`;
    }

    // Check for similar difficulty
    const preferredDifficulties = [...new Set(favoriteRecipes.map(r => r.difficulty))];
    if (preferredDifficulties.includes(recipe.difficulty)) {
      return `Because you enjoy ${recipe.difficulty} recipes`;
    }

    // Check for similar cooking time
    const avgCookTime = favoriteRecipes
      .filter(r => r.cookingTime)
      .reduce((sum, r, _, arr) => sum + r.cookingTime / arr.length, 0);
    
    if (recipe.cookingTime && Math.abs(recipe.cookingTime - avgCookTime) <= 10) {
      return `Because you like recipes that take about ${recipe.cookingTime} minutes`;
    }

    return 'Based on your preferences';
  };

  return (
    <div className="recommendations-list">
      <div className="recommendations-header">
        <div className="header-content">
          <h2>Recommended for You</h2>
          <p className="recommendations-subtitle">
            Based on your {favorites.length} favorite recipe{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button 
          onClick={handleRefreshRecommendations}
          disabled={isRefreshing}
          className="refresh-btn"
          title="Get new recommendations"
        >
          <span className={`refresh-icon ${isRefreshing ? 'spinning' : ''}`}>🔄</span>
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {userPreferences.preferredTags.length > 0 && (
        <div className="preference-indicators">
          <span className="preference-label">Your preferences:</span>
          <div className="preference-tags">
            {userPreferences.preferredTags.slice(0, 5).map(tag => (
              <span key={tag} className="preference-tag">{tag}</span>
            ))}
            {userPreferences.preferredTags.length > 5 && (
              <span className="more-preferences">+{userPreferences.preferredTags.length - 5} more</span>
            )}
          </div>
        </div>
      )}

      <div className="recommendations-grid">
        {recommendations.map(recipe => (
          <div key={recipe.id} className="recommendation-card">
            <div className="recommendation-reason">
              {getRecommendationReason(recipe)}
            </div>
            
            <div className="recipe-header">
              <Link to={`/recipe/${recipe.id}`} className="recipe-title-link">
                <h3>{recipe.title}</h3>
              </Link>
              <FavoriteButton recipeId={recipe.id} size="small" />
            </div>
            
            <p className="recipe-description">{recipe.description}</p>
            
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="recipe-tags">
                {recipe.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag} 
                    className={`recipe-tag ${userPreferences.preferredTags.includes(tag) ? 'preferred-tag' : ''}`}
                  >
                    {tag}
                    {userPreferences.preferredTags.includes(tag) && ' ✨'}
                  </span>
                ))}
                {recipe.tags.length > 3 && (
                  <span className="more-tags">+{recipe.tags.length - 3}</span>
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
                Try This Recipe →
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

      <div className="recommendations-footer">
        <p className="recommendations-note">
          💡 <strong>Tip:</strong> The more recipes you favorite, the better our recommendations become!
        </p>
      </div>
    </div>
  );
};

export default RecommendationsList;