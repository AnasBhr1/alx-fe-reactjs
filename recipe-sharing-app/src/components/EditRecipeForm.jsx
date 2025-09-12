import { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const EditRecipeForm = ({ recipe, onEditSuccess }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: recipe.title || '',
    description: recipe.description || '',
    ingredients: recipe.ingredients ? recipe.ingredients.join('\n') : '',
    instructions: recipe.instructions ? recipe.instructions.join('\n') : '',
    prepTime: recipe.prepTime || '',
    cookingTime: recipe.cookingTime || '',
    servings: recipe.servings || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedRecipe = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      ingredients: formData.ingredients 
        ? formData.ingredients.split('\n').filter(item => item.trim()).map(item => item.trim())
        : undefined,
      instructions: formData.instructions 
        ? formData.instructions.split('\n').filter(item => item.trim()).map(item => item.trim())
        : undefined,
      prepTime: formData.prepTime ? parseInt(formData.prepTime) : undefined,
      cookingTime: formData.cookingTime ? parseInt(formData.cookingTime) : undefined,
      servings: formData.servings ? parseInt(formData.servings) : undefined
    };

    updateRecipe(recipe.id, updatedRecipe);
    setIsSubmitting(false);
    onEditSuccess();
  };

  return (
    <div className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Recipe Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter recipe title..."
              disabled={isSubmitting}
              maxLength={100}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your recipe..."
            rows={4}
            disabled={isSubmitting}
            maxLength={500}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter each ingredient on a new line..."
            rows={6}
            disabled={isSubmitting}
          />
          <small className="form-help">Enter each ingredient on a separate line</small>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Enter each instruction step on a new line..."
            rows={8}
            disabled={isSubmitting}
          />
          <small className="form-help">Enter each instruction step on a separate line</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="prepTime">Prep Time (minutes)</label>
            <input
              id="prepTime"
              name="prepTime"
              type="number"
              value={formData.prepTime}
              onChange={handleChange}
              placeholder="30"
              disabled={isSubmitting}
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              id="cookingTime"
              name="cookingTime"
              type="number"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="45"
              disabled={isSubmitting}
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input
              id="servings"
              name="servings"
              type="number"
              value={formData.servings}
              onChange={handleChange}
              placeholder="4"
              disabled={isSubmitting}
              min="1"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
            className="submit-btn"
          >
            {isSubmitting ? 'Updating...' : 'Update Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;