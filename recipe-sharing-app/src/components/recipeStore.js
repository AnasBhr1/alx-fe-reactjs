import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  // Initial state with sample recipes
  recipes: [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      description: "Delicious homemade cookies with chocolate chips. Perfect for any occasion!",
      ingredients: ["2 cups flour", "1 cup butter", "1/2 cup brown sugar", "1/2 cup white sugar", "2 eggs", "1 tsp vanilla", "1 tsp baking soda", "1/2 tsp salt", "2 cups chocolate chips"],
      instructions: ["Preheat oven to 375°F", "Mix dry ingredients", "Cream butter and sugars", "Add eggs and vanilla", "Combine wet and dry ingredients", "Fold in chocolate chips", "Drop on baking sheet", "Bake 9-11 minutes"],
      prepTime: 15,
      cookingTime: 10,
      servings: 24
    },
    {
      id: 2,
      title: "Spaghetti Carbonara", 
      description: "Traditional Italian pasta dish with eggs, cheese, and pancetta.",
      ingredients: ["1 lb spaghetti", "6 oz pancetta", "4 eggs", "1 cup parmesan cheese", "2 cloves garlic", "Black pepper", "Salt"],
      instructions: ["Cook spaghetti according to package directions", "Cook pancetta until crispy", "Whisk eggs with cheese", "Toss hot pasta with egg mixture", "Add pancetta and serve"],
      prepTime: 10,
      cookingTime: 15,
      servings: 4
    }
  ],

  // Search and filter state
  searchTerm: '',
  selectedFilters: {
    maxPrepTime: null,
    maxCookingTime: null,
    minServings: null,
    maxServings: null
  },
  sortBy: 'title', // 'title', 'prepTime', 'cookingTime', 'servings', 'newest'

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
  })),

  // Search and filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setFilters: (filters) => set((state) => ({
    selectedFilters: { ...state.selectedFilters, ...filters }
  })),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  clearFilters: () => set({
    searchTerm: '',
    selectedFilters: {
      maxPrepTime: null,
      maxCookingTime: null,
      minServings: null,
      maxServings: null
    }
  }),

  // Computed filtered and sorted recipes
  getFilteredRecipes: () => {
    const state = get();
    let filtered = state.recipes;

    // Text search across multiple fields
    if (state.searchTerm.trim()) {
      const searchLower = state.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(searchLower);
        const descriptionMatch = recipe.description.toLowerCase().includes(searchLower);
        const ingredientsMatch = recipe.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchLower)
        ) || false;
        const instructionsMatch = recipe.instructions?.some(instruction => 
          instruction.toLowerCase().includes(searchLower)
        ) || false;
        
        return titleMatch || descriptionMatch || ingredientsMatch || instructionsMatch;
      });
    }

    // Apply time and serving filters
    const { maxPrepTime, maxCookingTime, minServings, maxServings } = state.selectedFilters;
    
    if (maxPrepTime) {
      filtered = filtered.filter(recipe => !recipe.prepTime || recipe.prepTime <= maxPrepTime);
    }
    
    if (maxCookingTime) {
      filtered = filtered.filter(recipe => !recipe.cookingTime || recipe.cookingTime <= maxCookingTime);
    }
    
    if (minServings) {
      filtered = filtered.filter(recipe => !recipe.servings || recipe.servings >= minServings);
    }
    
    if (maxServings) {
      filtered = filtered.filter(recipe => !recipe.servings || recipe.servings <= maxServings);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'prepTime':
          return (a.prepTime || 0) - (b.prepTime || 0);
        case 'cookingTime':
          return (a.cookingTime || 0) - (b.cookingTime || 0);
        case 'servings':
          return (a.servings || 0) - (b.servings || 0);
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }
}));

export default useRecipeStore;