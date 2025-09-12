import useRecipeStore from '../store/recipeStore';

const FavoriteButton = ({ recipeId, showText = false, size = 'medium' }) => {
  const { favorites, toggleFavorite } = useRecipeStore();
  const isFavorited = favorites.includes(recipeId);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation when button is inside a link
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  const sizeClasses = {
    small: 'favorite-btn-small',
    medium: 'favorite-btn-medium', 
    large: 'favorite-btn-large'
  };

  return (
    <button 
      onClick={handleToggleFavorite}
      className={`favorite-btn ${sizeClasses[size]} ${isFavorited ? 'favorited' : 'not-favorited'}`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="favorite-icon">
        {isFavorited ? '❤️' : '🤍'}
      </span>
      {showText && (
        <span className="favorite-text">
          {isFavorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;