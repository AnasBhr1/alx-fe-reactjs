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

// Function to fetch user data by username
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

export default { fetchUserData };