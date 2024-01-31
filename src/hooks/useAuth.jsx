import { BACKEND_API } from "../config";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../StateContext";

export default function useAuth() {
  const { setUserData } = useStateContext();
  const navigate = useNavigate();

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
        return true;
      } else {
        // Handle login failure
        console.error('Login failed');
        const loginData = await response.json();
        alert(loginData.message);
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

      if (response.ok) {
        // Registration successful
        return true;
      } else {
        // Handle registration failure
        const registerData = response.json();
        alert(registerData.message);
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
        },
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

  const logout = async () => {
    // Delete the token cookie and data on client-side
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUserData(null);
    navigate("/");

    // send logout request to backend
    try {
      const response = await fetch(`${BACKEND_API}/logout`, 
      { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' 
      });

      if (response.ok) console.error('logout successful');

    } catch (error) {
      console.error('Error during logout:', error);
    }

  };

  return {
    login,
    register,
    getUser,
    logout,
  }
}