import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../axiosConfig";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (name, nim, username, email, password, role) => {
    setIsLoading(true);
    setError(null);
    axios
      .post("/api/user/register", {
        name,
        nim,
        username,
        email,
        password,
        role,
      })
      .then((response) => {
        // handle success
        const json = response.data;
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        // update the auth context
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      })
      .catch((error) => {
        // handle error
        console.error(error);
        setIsLoading(false);
        setError("Terjadi kesalahan dalam melakukan register!");
      });

    // try {
    //   const response = await axios.post("/api/user/register", {
    //     name,
    //     nim,
    //     username,
    //     email,
    //     password,
    //     role,
    //   });

    //   const json = response.data;

    //   if (!response.ok) {
    //     setIsLoading(false);
    //     setError(json.error);
    //   }
    //   if (response.ok) {
    //     //save the user to local storage
    //     localStorage.setItem("user", JSON.stringify(json));

    //     //update the auth context
    //     dispatch({ type: "LOGIN", payload: json });

    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setIsLoading(false);
    //   setError("Terjadi kesalahan dalam melakukan register!");
    // }
  };
  return { register, isLoading, error };
};
