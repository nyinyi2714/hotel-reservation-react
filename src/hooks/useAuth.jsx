import { BACKEND_API } from "../config";
import { useStateContext } from "../StateContext";

export default function useAuth() {
  const { accessToken, setAccessToken, setUserData } = useStateContext();

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

      const responseData = await response.json();

      if (response.ok) {
        // Login successful
        setAccessToken(responseData.token);
        return true;
      } else {
        // Handle login failure
        console.error('Login failed');
        alert(responseData.error);
        return false;
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

      const responseData = await response.json();

      if (response.ok) {
        // Registration successful
        setAccessToken(responseData.token);
        return true;
      } else {
        // Handle registration failure
        alert(responseData.error);
        return false;
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include' 
      });
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
        return userData;
      }
      else {
        console.error('Retrival of current user failed')
        return { authenticated: false }
      }
    } catch (error) {
      console.error('Error during Retrival of current user:', error);
    }

  };

  const logout = async () => {
    // send logout request to backend
    try {
      const response = await fetch(`${BACKEND_API}/logout`, 
      { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include' 
      });

      if (response.ok) {
        console.log('logout successful');
        return true;
      }

    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }

  };

  return {
    login,
    register,
    getUser,
    logout,
  }
}