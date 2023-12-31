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
        `${process.env.APP_API_BASE_URL}/users/${user?.user?.id}`,
        formData);

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

  const updatePassword = async ({ currentPassword,  newPassword }) => {
    try {
      const request = await axios.patch(
        `${process.env.APP_API_BASE_URL}/users/change-pwd/${user?.user?.id}`, {
          currentPassword,
          newPassword,
        }
      );

      if (request?.data?.success && request?.data?.message === "User Password Update Successfully") {
        router.replace("/me");
      }
    } catch (error) {
      console.log(error.response);
      setError(error?.response?.data?.message);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const request = await axios.patch(
        `${process.env.APP_API_BASE_URL}/users/${id}`, 
        userData
      );

      if (request?.data?.success && request?.data?.message === "User Update Successfully") {
        setUpdated(true);
        router.replace(`/admin/users/${id}`);
      }
    } catch (error) {
      console.log(error.response);
      setError(error?.response?.data?.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const request = await axios.delete(
        `${process.env.APP_API_BASE_URL}/users/${id}`);

      if (request?.data?.success && request?.data?.message === "User Deleted Successfully") {
        router.replace(`/admin/users`);
      }
    } catch (error) {
      console.log(error.response);
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
        updatePassword,
        updateUser,
        deleteUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
