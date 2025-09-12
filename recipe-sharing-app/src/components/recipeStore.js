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
      servings: 24,
      tags: ["dessert", "cookies", "chocolate", "baking", "sweet"],
      difficulty: "easy"
    },
    {
      id: 2,
      title: "Spaghetti Carbonara", 
      description: "Traditional Italian pasta dish with eggs, cheese, and pancetta.",
      ingredients: ["1 lb spaghetti", "6 oz pancetta", "4 eggs", "1 cup parmesan cheese", "2 cloves garlic", "Black pepper", "Salt"],
      instructions: ["Cook spaghetti according to package directions", "Cook pancetta until crispy", "Whisk eggs with cheese", "Toss hot pasta with egg mixture", "Add pancetta and serve"],
      prepTime: 10,
      cookingTime: 15,
      servings: 4,
      tags: ["pasta", "italian", "dinner", "main course", "quick"],
      difficulty: "medium"
    },
    {
      id: 3,
      title: "Vegetarian Buddha Bowl",
      description: "Nutritious and colorful bowl with quinoa, roasted vegetables, and tahini dressing.",
      ingredients: ["1 cup quinoa", "2 cups mixed vegetables", "1/4 cup tahini", "2 tbsp lemon juice", "1 tbsp olive oil", "Salt and pepper"],
      instructions: ["Cook quinoa", "Roast vegetables", "Mix tahini dressing", "Assemble bowl", "Drizzle with dressing"],
      prepTime: 20,
      cookingTime: 25,
      servings: 2,
      tags: ["healthy", "vegetarian", "bowl", "quinoa", "vegetables"],
      difficulty: "easy"
    }
  ],

  // Favorites and user interaction tracking
  favorites: [],
  viewedRecipes: [], // Track recipe views for recommendations
  userPreferences: {
    preferredTags: [], // Tags user frequently favorites
    preferredDifficulty: null, // User's preferred difficulty level
    preferredCookingTime: null, // User's preferred max cooking time
    preferredServings: null // User's preferred serving size
  },

  // Search and filter state
  searchTerm: '',
  selectedFilters: {
    maxPrepTime: null,
    maxCookingTime: null,
    minServings: null,
    maxServings: null
  },
  sortBy: 'title',

  // Actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { 
      ...newRecipe, 
      id: Date.now(),
      tags: newRecipe.tags || [],
      difficulty: newRecipe.difficulty || 'medium'
    }] 
  })),
  
  setRecipes: (recipes) => set({ recipes }),
  
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id),
    favorites: state.favorites.filter(fId => fId !== id)
  })),

  // Favorites actions
  addFavorite: (recipeId) => set((state) => {
    if (state.favorites.includes(recipeId)) return state;
    
    const recipe = state.recipes.find(r => r.id === recipeId);
    if (!recipe) return state;

    // Update user preferences based on favorited recipe
    const updatedPreferences = { ...state.userPreferences };
    
    // Add recipe tags to preferred tags
    if (recipe.tags) {
      recipe.tags.forEach(tag => {
        if (!updatedPreferences.preferredTags.includes(tag)) {
          updatedPreferences.preferredTags.push(tag);
        }
      });
    }

    return {
      favorites: [...state.favorites, recipeId],
      userPreferences: updatedPreferences
    };
  }),

  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  toggleFavorite: (recipeId) => set((state) => {
    const isFavorited = state.favorites.includes(recipeId);
    if (isFavorited) {
      return { favorites: state.favorites.filter(id => id !== recipeId) };
    } else {
      const recipe = state.recipes.find(r => r.id === recipeId);
      if (!recipe) return state;

      // Update user preferences
      const updatedPreferences = { ...state.userPreferences };
      if (recipe.tags) {
        recipe.tags.forEach(tag => {
          if (!updatedPreferences.preferredTags.includes(tag)) {
            updatedPreferences.preferredTags.push(tag);
          }
        });
      }

      return {
        favorites: [...state.favorites, recipeId],
        userPreferences: updatedPreferences
      };
    }
  }),

  // Track recipe views for better recommendations
  addViewedRecipe: (recipeId) => set((state) => {
    const updatedViewed = state.viewedRecipes.filter(id => id !== recipeId);
    return {
      viewedRecipes: [recipeId, ...updatedViewed].slice(0, 20) // Keep last 20 viewed
    };
  }),

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

  // Get favorites recipes
  getFavoriteRecipes: () => {
    const state = get();
    return state.favorites
      .map(id => state.recipes.find(recipe => recipe.id === id))
      .filter(Boolean);
  },

  // Intelligent recommendations based on user behavior
  getRecommendations: () => {
    const state = get();
    const { recipes, favorites, userPreferences, viewedRecipes } = state;
    
    if (recipes.length === 0) return [];

    let scored = recipes.map(recipe => {
      let score = 0;
      
      // Don't recommend already favorited recipes
      if (favorites.includes(recipe.id)) return null;

      // Boost score for preferred tags
      if (recipe.tags && userPreferences.preferredTags.length > 0) {
        const matchingTags = recipe.tags.filter(tag => 
          userPreferences.preferredTags.includes(tag)
        ).length;
        score += matchingTags * 10;
      }

      // Boost score for recipes with similar tags to favorites
      const favoriteRecipes = favorites
        .map(id => recipes.find(r => r.id === id))
        .filter(Boolean);
      
      favoriteRecipes.forEach(favRecipe => {
        if (favRecipe.tags && recipe.tags) {
          const commonTags = favRecipe.tags.filter(tag => recipe.tags.includes(tag));
          score += commonTags.length * 5;
        }
      });

      // Boost score for similar difficulty
      if (favoriteRecipes.length > 0) {
        const preferredDifficulties = [...new Set(favoriteRecipes.map(r => r.difficulty))];
        if (preferredDifficulties.includes(recipe.difficulty)) {
          score += 8;
        }
      }

      // Boost score for similar cooking time
      if (favoriteRecipes.length > 0) {
        const avgCookTime = favoriteRecipes
          .filter(r => r.cookingTime)
          .reduce((sum, r, _, arr) => sum + r.cookingTime / arr.length, 0);
        
        if (recipe.cookingTime) {
          const timeDiff = Math.abs(recipe.cookingTime - avgCookTime);
          if (timeDiff <= 10) score += 6;
          else if (timeDiff <= 20) score += 3;
        }
      }

      // Boost score for similar serving size
      if (favoriteRecipes.length > 0) {
        const avgServings = favoriteRecipes
          .filter(r => r.servings)
          .reduce((sum, r, _, arr) => sum + r.servings / arr.length, 0);
        
        if (recipe.servings) {
          const servingsDiff = Math.abs(recipe.servings - avgServings);
          if (servingsDiff <= 1) score += 4;
          else if (servingsDiff <= 2) score += 2;
        }
      }

      // Slight penalty for recently viewed recipes (avoid over-showing same recipes)
      if (viewedRecipes.includes(recipe.id)) {
        score -= 2;
      }

      // Add some randomness to prevent always showing same recommendations
      score += Math.random() * 3;

      return { recipe, score };
    }).filter(Boolean);

    // Sort by score and return top recommendations
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.recipe);
  },

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
        const tagsMatch = recipe.tags?.some(tag => 
          tag.toLowerCase().includes(searchLower)
        ) || false;
        
        return titleMatch || descriptionMatch || ingredientsMatch || instructionsMatch || tagsMatch;
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