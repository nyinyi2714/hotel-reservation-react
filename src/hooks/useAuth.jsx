import { BACKEND_API } from "../config";

export default function useAuth() {
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BACKEND_API}/login`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        const loginData = await response.json();
        console.log(loginData);
      } else {
        // Handle login failure
        console.error('Login failed');
        const loginData = await response.json();
        console.log(loginData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const register = async (firstname, lastname, email, password) => {
    try {
      const response = await fetch(`${BACKEND_API}/register`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (response.ok) {
        // Registration successful, you might redirect or perform other actions here
        console.log('Registration successful');
      } else {
        // Handle registration failure, display an error message, etc.
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/checkAuth`, 
      { 
        method: 'GET',
        credentials: 'include' 
      });
      if (response.ok) {
        const userData = await response.json();
        console.log(userData)
        return userData;
      }
      else {
        console.error('Retrival of current user failed')
      }
    } catch (error) {
      console.error('Error during Retrival of current user:', error);
    }

  };

  return {
    login,
    register,
    getUser,
  }
}