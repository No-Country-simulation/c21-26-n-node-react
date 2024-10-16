import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { LoginUser, RegisterUser } from "../types/authInterfaces";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (user: RegisterUser) => {
    try {
      const res = await registerRequest(user);

      setUser(res.data);

      console.log(res.data);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data);
    }
  };

  const login = async (user: LoginUser) => {
    try {
      const res = await loginRequest(user);
      localStorage.setItem("token", res.data.access_token);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      setErrors([error.response.data]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, user, isAuthenticated, errors, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
