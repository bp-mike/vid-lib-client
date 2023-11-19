"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
// import { toast } from "react-toastify";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const router = useRouter();

  const newMovie = async (movie) => {
    try {
      const request = await axios.post(`${process.env.APP_API_BASE_URL}/movies`, 
        movie
      );

      if (request.data.success && request.data.message === "Movie added Successfully") {
        router.push("/admin/movies");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <MovieContext.Provider
      value={{
        error,
        loading,
        newMovie,
        clearErrors,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
