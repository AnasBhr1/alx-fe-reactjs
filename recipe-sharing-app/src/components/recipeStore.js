import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  // Initial state with sample recipes
  recipes: [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      description: "Delicious homemade cookies with chocolate chips. Perfect for any occasion!"
    },
    {
      id: 2,
      title: "Spaghetti Carbonara", 
      description: "Traditional Italian pasta dish with eggs, cheese, and pancetta."
    }
  ],

  // Actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
  })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  }))
}));

export default useRecipeStore;