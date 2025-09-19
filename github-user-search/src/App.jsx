import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              GitHub User Search
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover and explore GitHub users with advanced search capabilities
            </p>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="py-8">
        <Search />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              Built with React & GitHub API • Search users by location, repositories, and more
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;