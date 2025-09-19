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

// GitHub service functions
export const githubService = {
  // Search for users
  searchUsers: async (query, page = 1, perPage = 30) => {
    try {
      const response = await githubApi.get('/search/users', {
        params: {
          q: query,
          page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search users: ${error.message}`);
    }
  },

  // Get user details
  getUserDetails: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`Failed to get user details: ${error.message}`);
    }
  },

  // Get user repositories
  getUserRepos: async (username, page = 1, perPage = 30) => {
    try {
      const response = await githubApi.get(`/users/${username}/repos`, {
        params: {
          page,
          per_page: perPage,
          sort: 'updated',
          direction: 'desc',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get user repositories: ${error.message}`);
    }
  },
};

export default githubService;