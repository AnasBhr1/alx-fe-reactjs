import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );

  if (!recipe) {
    return (
      <div className="recipe-details-container">
        <div className="recipe-not-found">
          <h2>Recipe Not Found</h2>
          <p>The recipe you're looking for doesn't exist or may have been deleted.</p>
          <Link to="/" className="back-btn">
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-header">
        <Link to="/" className="back-btn">
          ← Back to Recipes
        </Link>
        <div className="recipe-actions">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`edit-toggle-btn ${isEditing ? 'active' : ''}`}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Recipe'}
          </button>
          <DeleteRecipeButton 
            recipeId={recipe.id} 
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </div>

      {isEditing ? (
        <EditRecipeForm 
          recipe={recipe} 
          onEditSuccess={handleEditSuccess}
        />
      ) : (
        <div className="recipe-details-content">
          <div className="recipe-details-card">
            <div className="recipe-details-header-info">
              <h1 className="recipe-title">{recipe.title}</h1>
              <div className="recipe-meta-info">
                <span className="recipe-id">Recipe ID: {recipe.id}</span>
                <span className="recipe-created">
                  Created: {new Date(recipe.id).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="recipe-description">
              <h3>Description</h3>
              <p>{recipe.description}</p>
            </div>

            {recipe.ingredients && (
              <div className="recipe-ingredients">
                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.instructions && (
              <div className="recipe-instructions">
                <h3>Instructions</h3>
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}

            {recipe.cookingTime && (
              <div className="recipe-timing">
                <h3>Cooking Information</h3>
                <div className="timing-info">
                  {recipe.prepTime && (
                    <span className="time-item">
                      <strong>Prep Time:</strong> {recipe.prepTime} minutes
                    </span>
                  )}
                  <span className="time-item">
                    <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                  </span>
                  {recipe.servings && (
                    <span className="time-item">
                      <strong>Servings:</strong> {recipe.servings}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;