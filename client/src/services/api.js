import { API_BASE_URL } from '../config/config';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    // First check if the response is json
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server response was not in JSON format');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    if (error.message === 'Server response was not in JSON format') {
      console.error('Server Response Error:', error);
      throw new Error('Server error. Please try again later.');
    }
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store the token in localStorage
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
};
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if token exists, false otherwise
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData  // Don't set Content-Type header when sending FormData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Log the request details
    console.log('Request URL:', `${process.env.REACT_APP_API_URL}/api/blogs`);
    console.log('Request Headers:', {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log('Request Body:', blogData);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData)
    });

    // Log the response details
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error('Invalid Response:', text);
      throw new Error('Server returned invalid response format');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create blog');
    }

    return data;
  } catch (error) {
    console.error('Create Blog Error:', error);
    throw error;
  }
};
