import axios from 'axios';

// GitHub API base URL
const GITHUB_API_BASE_URL = 'https://api.github.com';

// Create axios instance with default configuration
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor to include auth token if available
githubApi.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
  if (token && token !== 'your_github_token_here_optional') {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
githubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle rate limiting
    if (error.response?.status === 403 && error.response?.headers['x-ratelimit-remaining'] === '0') {
      const resetTime = new Date(parseInt(error.response.headers['x-ratelimit-reset']) * 1000);
      throw new Error(`Rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
    }
    
    // Handle API errors gracefully
    if (error.response?.status >= 500) {
      throw new Error('GitHub API is currently unavailable. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

// Function to fetch user data by username (original functionality)
export const fetchUserData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

// Advanced search function with multiple criteria
// GitHub Search Users API endpoint: https://api.github.com/search/users?q={query}
export const searchUsers = async (searchParams, page = 1, perPage = 30) => {
  try {
    const { username, location, minRepos, maxRepos, language, followers } = searchParams;
    
    // Build query string for GitHub Search API
    let queryParts = [];
    
    // Add username/keyword search
    if (username && username.trim()) {
      queryParts.push(username.trim());
    }
    
    // Add location filter
    if (location && location.trim()) {
      queryParts.push(`location:"${location.trim()}"`);
    }
    
    // Add repository count filters
    if (minRepos && minRepos > 0) {
      if (maxRepos && maxRepos >= minRepos) {
        queryParts.push(`repos:${minRepos}..${maxRepos}`);
      } else {
        queryParts.push(`repos:>=${minRepos}`);
      }
    } else if (maxRepos && maxRepos > 0) {
      queryParts.push(`repos:<=${maxRepos}`);
    }
    
    // Add language filter
    if (language && language.trim()) {
      queryParts.push(`language:"${language.trim()}"`);
    }
    
    // Add followers filter
    if (followers && followers > 0) {
      queryParts.push(`followers:>=${followers}`);
    }
    
    // If no search criteria provided, search for all users
    if (queryParts.length === 0) {
      queryParts.push('type:user');
    }
    
    const query = queryParts.join(' ');
    
    const response = await githubApi.get('/search/users', {
      params: {
        q: query,
        page,
        per_page: Math.min(perPage, 100), // GitHub API limits to 100 per page
        sort: 'repositories',
        order: 'desc'
      },
    });
    
    return {
      users: response.data.items || [],
      totalCount: Math.min(response.data.total_count || 0, 1000), // GitHub limits to 1000 results
      hasMore: response.data.items && response.data.items.length === perPage && page < 34 // Max 34 pages (1000/30)
    };
  } catch (error) {
    if (error.response?.status === 422) {
      throw new Error('Invalid search criteria. Please check your input.');
    }
    if (error.response?.status === 403) {
      throw new Error('Search rate limit exceeded. Please try again in a few minutes.');
    }
    throw new Error(`Search failed: ${error.message}`);
  }
};

// Get detailed user information (for when user clicks on a result)
export const getUserDetails = async (username) => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      githubApi.get(`/users/${username}`),
      githubApi.get(`/users/${username}/repos`, {
        params: { 
          sort: 'updated', 
          per_page: 5,
          type: 'owner'
        }
      })
    ]);
    
    return {
      user: userResponse.data,
      repositories: reposResponse.data
    };
  } catch (error) {
    throw new Error(`Failed to get user details: ${error.message}`);
  }
};

export default { 
  fetchUserData, 
  searchUsers, 
  getUserDetails 
};