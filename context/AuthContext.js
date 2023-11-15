"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const registerUser = async ({ userName, email, password }) => {
    try {
      let request = await axios.post(`${process.env.APP_API_BASE_URL}/users`, {
          userName,
          email,
          password,
        }
      );

      if (request.data.success && request.data.message === "User Registered Successfully") {
        router.push("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      let request = await axios.post(`${process.env.APP_API_BASE_URL}/login`, {
          email,
          password,
        }
      );

      if (request.data.success && request.data.message === "logged in successfully") {
        
        // this.axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${request.data.token}`;
        console.log(request.data.token);

        toast.success("User logged in successfully")
        router.push("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      toast.error("Unexpected error occurred, please try again later");
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
        registerUser,
        loginUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
