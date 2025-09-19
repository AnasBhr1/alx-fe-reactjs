import { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/githubService';
import UserCard from './UserCard';

const Search = () => {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    location: '',
    minRepos: '',
    maxRepos: '',
    language: '',
    followers: ''
  });
  
  // Results state
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await performSearch(1, false);
  };

  // Perform search with pagination support
  const performSearch = async (page = 1, append = false) => {
    setLoading(true);
    setError('');
    
    if (!append) {
      setUsers([]);
      setCurrentPage(1);
    }

    try {
      const result = await searchUsers(formData, page, 20);
      
      if (append) {
        setUsers(prev => [...prev, ...result.users]);
      } else {
        setUsers(result.users);
      }
      
      setTotalCount(result.totalCount);
      setHasMore(result.hasMore);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
      if (!append) {
        setUsers([]);
        setTotalCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load more results
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      performSearch(currentPage + 1, true);
    }
  };

  // Quick search for single user (original functionality)
  const handleQuickSearch = async () => {
    if (!formData.username.trim()) return;
    
    setLoading(true);
    setError('');
    setUsers([]);
    
    try {
      const userData = await fetchUserData(formData.username.trim());
      setUsers([userData]);
      setTotalCount(1);
      setHasMore(false);
    } catch (err) {
      setError('Looks like we cant find the user');
      setUsers([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Clear form
  const handleClear = () => {
    setFormData({
      username: '',
      location: '',
      minRepos: '',
      maxRepos: '',
      language: '',
      followers: ''
    });
    setUsers([]);
    setTotalCount(0);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Search GitHub Users
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username or keyword..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={loading}
              />
            </div>
            <div className="flex gap-2 sm:items-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button
                type="button"
                onClick={handleQuickSearch}
                disabled={loading || !formData.username.trim()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Quick
              </button>
            </div>
          </div>

          {/* Advanced Search Toggle */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
            >
              {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-600 hover:text-gray-800 text-sm focus:outline-none focus:underline"
            >
              Clear All
            </button>
          </div>

          {/* Advanced Search Fields */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. New York"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  placeholder="e.g. JavaScript"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="followers" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Followers
                </label>
                <input
                  type="number"
                  id="followers"
                  name="followers"
                  value={formData.followers}
                  onChange={handleInputChange}
                  placeholder="e.g. 100"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Repositories
                </label>
                <input
                  type="number"
                  id="minRepos"
                  name="minRepos"
                  value={formData.minRepos}
                  onChange={handleInputChange}
                  placeholder="e.g. 5"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="maxRepos" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Repositories
                </label>
                <input
                  type="number"
                  id="maxRepos"
                  name="maxRepos"
                  value={formData.maxRepos}
                  onChange={handleInputChange}
                  placeholder="e.g. 100"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {/* Results Header */}
        {(users.length > 0 || loading || error) && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && users.length > 0 && (
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Found {totalCount.toLocaleString()} user{totalCount !== 1 ? 's' : ''}
                </h2>
                <span className="text-sm text-gray-500">
                  Showing {users.length} result{users.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            {!loading && !error && users.length === 0 && totalCount === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or check your spelling.</p>
              </div>
            )}
          </div>
        )}

        {/* User Results */}
        {users.length > 0 && !loading && (
          <div className="grid gap-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Load More Users
            </button>
          </div>
        )}

        {/* Welcome Message */}
        {users.length === 0 && !loading && !error && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to GitHub User Search</h3>
            <p className="text-gray-600 mb-4">
              Search for GitHub users by username, location, repository count, and more.
            </p>
            <p className="text-sm text-gray-500">
              Use the <strong>Quick</strong> button for single user lookup, or <strong>Search</strong> for advanced filtering.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;