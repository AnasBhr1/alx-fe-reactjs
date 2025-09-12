import { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addRecipe({ 
      title: title.trim(), 
      description: description.trim() 
    });
    
    setTitle('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <div className="add-recipe-form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title..."
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe..."
            rows={4}
            disabled={isSubmitting}
            maxLength={500}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || !title.trim() || !description.trim()}
          className="submit-btn"
        >
          {isSubmitting ? 'Adding...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;