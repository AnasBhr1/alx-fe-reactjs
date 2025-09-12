import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId, onDeleteSuccess, showText = true }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === recipeId)
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    deleteRecipe(recipeId);
    setIsDeleting(false);
    setShowConfirmation(false);
    
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  if (!recipe) {
    return null;
  }

  if (showConfirmation) {
    return (
      <div className="delete-confirmation">
        <div className="confirmation-content">
          <h3>Delete Recipe?</h3>
          <p>
            Are you sure you want to delete "{recipe.title}"? 
            This action cannot be undone.
          </p>
          <div className="confirmation-actions">
            <button 
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="confirm-delete-btn"
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button 
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="cancel-delete-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button 
      onClick={handleDeleteClick}
      className={`delete-recipe-btn ${showText ? 'with-text' : 'icon-only'}`}
      title={`Delete ${recipe.title}`}
      aria-label={`Delete recipe: ${recipe.title}`}
    >
      {showText ? (
        <>
          <span className="delete-icon">🗑️</span>
          Delete Recipe
        </>
      ) : (
        '×'
      )}
    </button>
  );
};

export default DeleteRecipeButton;