import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../axiosConfig";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  // const { user } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });

      // Handle success
      const userData = response.data;
      const userRole = userData.role;
      console.log(userRole);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", userRole);

      // Update the auth context
      dispatch({ type: "LOGIN", payload: userData });
      setIsLoading(false);
    } catch (error) {
      // Handle error
      console.error(error);
      setIsLoading(false);
      setError("Terjadi kesalahan dalam melakukan login!");
    }
  };
  return { login, isLoading, error };
};
