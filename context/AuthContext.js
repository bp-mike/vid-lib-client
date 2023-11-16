"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
// import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const router = useRouter();

  const registerUser = async ({ userName, email, password }) => {
    try {
      const request = await axios.post(`${process.env.APP_API_BASE_URL}/users`, {
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

  
  const loadUser = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/auth/session?update");

      if (data?.user) {
        setUser(data.user);
        router.replace("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProfile = async (formData) => {
    console.log(formData);
    try {
      setLoading(true);

      const request = await axios.patch(
        `${process.env.APP_API_BASE_URL}/users/${user.id}`,
        formData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      if (request?.data?.success && request.data.message === "User Update Successfully") {
        // loadUser();
        loadUser({ profileUpdated: true });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  // TODO set jwt
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        setUser,
        registerUser,
        updateProfile,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
