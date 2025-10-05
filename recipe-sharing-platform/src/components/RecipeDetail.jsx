import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Extended mock data with full recipe details
const mockRecipesData = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    summary: "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
    image: "https://via.placeholder.com/600x400/4299e1/ffffff?text=Spaghetti+Carbonara",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, diced",
      "4 large eggs",
      "100g Pecorino Romano cheese, grated",
      "50g Parmesan cheese, grated",
      "2 cloves garlic, minced",
      "Salt and black pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions until al dente.",
      "While pasta cooks, fry pancetta in a large skillet over medium heat until crispy, about 5-7 minutes.",
      "In a bowl, whisk together eggs, Pecorino Romano, and Parmesan cheese. Season with black pepper.",
      "Reserve 1 cup of pasta water, then drain the spaghetti.",
      "Remove skillet from heat and add the hot pasta to the pancetta, tossing to combine.",
      "Quickly pour the egg and cheese mixture over the pasta, tossing continuously to create a creamy sauce. Add pasta water as needed to achieve desired consistency.",
      "Serve immediately, garnished with extra cheese, black pepper, and fresh parsley."
    ],
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    summary: "Chunks of grilled chicken (tikka) cooked in a smooth buttery & creamy tomato based gravy.",
    image: "https://via.placeholder.com/600x400/f56565/ffffff?text=Chicken+Tikka",
    ingredients: [
      "800g boneless chicken, cut into cubes",
      "1 cup yogurt",
      "2 tbsp tikka masala spice blend",
      "3 tbsp vegetable oil",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "2 tbsp ginger, grated",
      "400g crushed tomatoes",
      "1 cup heavy cream",
      "2 tbsp butter",
      "Fresh cilantro for garnish",
      "Salt to taste"
    ],
    instructions: [
      "Marinate chicken in yogurt and half the tikka masala spice for at least 1 hour, preferably overnight.",
      "Heat oil in a large skillet and cook marinated chicken until golden brown. Set aside.",
      "In the same pan, add butter and sauté onions until soft and golden.",
      "Add garlic and ginger, cook for 1 minute until fragrant.",
      "Stir in remaining tikka masala spice and cook for 30 seconds.",
      "Add crushed tomatoes and simmer for 10 minutes.",
      "Blend the sauce until smooth, then return to pan.",
      "Add cream and cooked chicken, simmer for 10-15 minutes until chicken is cooked through.",
      "Garnish with fresh cilantro and serve with rice or naan bread."
    ],
    prepTime: "15 minutes (plus marinating time)",
    cookTime: "35 minutes",
    servings: 6
  },
  {
    id: 3,
    title: "Caesar Salad",
    summary: "A green salad of romaine lettuce and croutons dressed with lemon juice, olive oil, egg, and parmesan cheese.",
    image: "https://via.placeholder.com/600x400/48bb78/ffffff?text=Caesar+Salad",
    ingredients: [
      "2 heads romaine lettuce, chopped",
      "1 cup croutons",
      "1/2 cup Parmesan cheese, shaved",
      "4 anchovy fillets",
      "2 cloves garlic, minced",
      "2 egg yolks",
      "2 tbsp lemon juice",
      "1 tsp Dijon mustard",
      "1/2 cup olive oil",
      "Salt and black pepper to taste"
    ],
    instructions: [
      "In a large bowl, combine chopped romaine lettuce.",
      "For the dressing: Mash anchovies and garlic into a paste.",
      "Whisk in egg yolks, lemon juice, and Dijon mustard.",
      "Slowly drizzle in olive oil while whisking continuously until emulsified.",
      "Season with salt and pepper to taste.",
      "Toss lettuce with dressing until well coated.",
      "Top with croutons and shaved Parmesan cheese.",
      "Serve immediately while lettuce is crisp."
    ],
    prepTime: "15 minutes",
    cookTime: "0 minutes",
    servings: 4
  },
  {
    id: 4,
    title: "Beef Tacos",
    summary: "Seasoned ground beef served in crispy taco shells with fresh toppings and zesty salsa.",
    image: "https://via.placeholder.com/600x400/ed8936/ffffff?text=Beef+Tacos",
    ingredients: [
      "500g ground beef",
      "1 packet taco seasoning",
      "8 taco shells",
      "1 cup shredded lettuce",
      "1 cup diced tomatoes",
      "1 cup shredded cheddar cheese",
      "1/2 cup sour cream",
      "1/2 cup salsa",
      "1/4 cup diced onions",
      "Fresh cilantro for garnish",
      "Lime wedges for serving"
    ],
    instructions: [
      "In a large skillet, cook ground beef over medium-high heat until browned, breaking it apart as it cooks.",
      "Drain excess fat from the pan.",
      "Add taco seasoning and water according to package directions. Simmer for 5 minutes.",
      "While meat cooks, warm taco shells according to package instructions.",
      "Prepare all toppings: shred lettuce, dice tomatoes and onions, and set out cheese and condiments.",
      "Fill each taco shell with seasoned beef.",
      "Top with lettuce, tomatoes, cheese, sour cream, and salsa.",
      "Garnish with fresh cilantro and serve with lime wedges."
    ],
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4
  },
  {
    id: 5,
    title: "Margherita Pizza",
    summary: "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
    image: "https://via.placeholder.com/600x400/9f7aea/ffffff?text=Margherita+Pizza",
    ingredients: [
      "1 pizza dough ball",
      "1/2 cup tomato sauce",
      "200g fresh mozzarella, sliced",
      "2 tbsp olive oil",
      "Fresh basil leaves",
      "2 cloves garlic, minced",
      "Salt to taste",
      "Flour for dusting"
    ],
    instructions: [
      "Preheat oven to 475°F (245°C). Place pizza stone or baking sheet in oven to heat.",
      "On a floured surface, stretch pizza dough into a 12-inch circle.",
      "Mix tomato sauce with minced garlic and a pinch of salt.",
      "Spread sauce evenly over dough, leaving a 1-inch border for the crust.",
      "Arrange mozzarella slices evenly over the sauce.",
      "Drizzle with olive oil and season with salt.",
      "Carefully transfer pizza to hot pizza stone or baking sheet.",
      "Bake for 12-15 minutes until crust is golden and cheese is bubbling.",
      "Remove from oven and immediately top with fresh basil leaves.",
      "Let cool for 2 minutes, slice, and serve hot."
    ],
    prepTime: "15 minutes",
    cookTime: "15 minutes",
    servings: 2
  },
  {
    id: 6,
    title: "Chocolate Chip Cookies",
    summary: "Soft and chewy cookies loaded with chocolate chips, perfect for any sweet tooth.",
    image: "https://via.placeholder.com/600x400/d69e2e/ffffff?text=Cookies",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a bowl, whisk together flour, baking soda, and salt. Set aside.",
      "In a large bowl, cream together butter, granulated sugar, and brown sugar until fluffy.",
      "Beat in eggs one at a time, then stir in vanilla extract.",
      "Gradually blend in the flour mixture.",
      "Fold in chocolate chips until evenly distributed.",
      "Drop rounded tablespoons of dough onto ungreased cookie sheets, spacing them 2 inches apart.",
      "Bake for 9-11 minutes or until golden brown around the edges.",
      "Cool on baking sheet for 2 minutes, then transfer to a wire rack.",
      "Store in an airtight container for up to 1 week."
    ],
    prepTime: "15 minutes",
    cookTime: "11 minutes",
    servings: 48
  }
];

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // In your actual project, import from '../data.json'
    // For now, we're using the extended mock data
    const foundRecipe = mockRecipesData.find(r => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipes
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">{recipe.title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Recipe Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <p className="text-white text-lg">{recipe.summary}</p>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="p-8">
            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-600">Prep Time</p>
                <p className="text-lg font-semibold text-gray-800">{recipe.prepTime}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                <p className="text-sm text-gray-600">Cook Time</p>
                <p className="text-lg font-semibold text-gray-800">{recipe.cookTime}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-sm text-gray-600">Servings</p>
                <p className="text-lg font-semibold text-gray-800">{recipe.servings}</p>
              </div>
            </div>

            {/* Two Column Layout for Ingredients and Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Ingredients Section */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Ingredients
                  </h2>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions Section */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Instructions
                </h2>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed pt-2">{instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Recipes Button */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Browse More Recipes
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2024 Recipe Sharing Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default RecipeDetail;