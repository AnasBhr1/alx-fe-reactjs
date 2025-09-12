import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const { recipes, deleteRecipe } = useRecipeStore();

  if (recipes.length === 0) {
    return (
      <div className="recipe-list-empty">
        <p>No recipes yet. Add your first recipe below!</p>
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
              <h3>{recipe.title}</h3>
              <button 
                onClick={() => deleteRecipe(recipe.id)}
                className="delete-btn"
                title="Delete recipe"
                aria-label={`Delete ${recipe.title}`}
              >
                ×
              </button>
            </div>
            <p>{recipe.description}</p>
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