import { useState, useEffect } from 'react';

// Mock data - in your actual project, this will come from src/data.json
const mockRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    summary: "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
    image: "https://via.placeholder.com/300x200/4299e1/ffffff?text=Spaghetti+Carbonara"
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    summary: "Chunks of grilled chicken (tikka) cooked in a smooth buttery & creamy tomato based gravy.",
    image: "https://via.placeholder.com/300x200/f56565/ffffff?text=Chicken+Tikka"
  },
  {
    id: 3,
    title: "Caesar Salad",
    summary: "A green salad of romaine lettuce and croutons dressed with lemon juice, olive oil, egg, and parmesan cheese.",
    image: "https://via.placeholder.com/300x200/48bb78/ffffff?text=Caesar+Salad"
  },
  {
    id: 4,
    title: "Beef Tacos",
    summary: "Seasoned ground beef served in crispy taco shells with fresh toppings and zesty salsa.",
    image: "https://via.placeholder.com/300x200/ed8936/ffffff?text=Beef+Tacos"
  },
  {
    id: 5,
    title: "Margherita Pizza",
    summary: "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
    image: "https://via.placeholder.com/300x200/9f7aea/ffffff?text=Margherita+Pizza"
  },
  {
    id: 6,
    title: "Chocolate Chip Cookies",
    summary: "Soft and chewy cookies loaded with chocolate chips, perfect for any sweet tooth.",
    image: "https://via.placeholder.com/300x200/d69e2e/ffffff?text=Cookies"
  }
];

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Simulate loading recipes from data.json
    // In your actual project, you'll import from '../data.json'
    setRecipes(mockRecipes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Recipe Sharing Platform
          </h1>
          <p className="text-gray-600 mt-2">
            Discover and share amazing recipes from around the world
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              {/* Recipe Image */}
              <div className="relative overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Recipe Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {recipe.summary}
                </p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">Loading recipes...</p>
          </div>
        )}
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

export default HomePage;