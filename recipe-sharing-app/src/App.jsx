import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import useRecipeStore from './components/recipeStore';
import './styles/App.css';

const App = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍳 Recipe Sharing App</h1>
        <p>Share and discover amazing recipes with the community</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <AddRecipeForm />
          <RecipeList />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Built with React & Zustand • {recipes.length} recipes and counting!</p>
      </footer>
    </div>
  );
};

export default App;