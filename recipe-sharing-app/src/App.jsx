import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import useRecipeStore from './store/recipeStore';
import './styles/App.css';

const HomePage = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <>
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
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;