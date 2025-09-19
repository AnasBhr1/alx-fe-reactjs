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
      queryParts.push(`location:${location.trim()}`);
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
      queryParts.push(`language:${language.trim()}`);
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
    
    // Make request to GitHub Search Users API: https://api.github.com/search/users?q={query}
    const searchUsersUrl = 'https://api.github.com/search/users?q=' + encodeURIComponent(query);
    console.log('Searching users with URL:', searchUsersUrl);
    
    const response = await githubApi.get('/search/users', {
      params: {
        q: query,
        page,
        per_page: perPage,
        sort: 'repositories', // Sort by repository count
        order: 'desc'
      },
    });
    
    return {
      users: response.data.items || [],
      totalCount: response.data.total_count || 0,
      hasMore: response.data.items && response.data.items.length === perPage
    };
  } catch (error) {
    if (error.response?.status === 422) {
      throw new Error('Invalid search criteria. Please check your input.');
    }
    throw new Error(`Failed to search users: ${error.message}`);
  }
};

// Get detailed user information (for when user clicks on a result)
export const getUserDetails = async (username) => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      githubApi.get(`/users/${username}`),
      githubApi.get(`/users/${username}/repos`, {
        params: { sort: 'updated', per_page: 5 }
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