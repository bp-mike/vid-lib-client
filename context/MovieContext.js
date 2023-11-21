"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
// import { toast } from "react-toastify";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

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

  const updateMovie = async (movie, id) => {
    try {
      const request = await axios.patch(`${process.env.APP_API_BASE_URL}/movies/${id}`, 
        movie
      );

      if (request.data.success && request.data.message === "Movie Update Successfully") {
        setUpdated(true);
        router.replace(`/admin/movies/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const request = await axios.delete(`${process.env.APP_API_BASE_URL}/movies/${id}`);

      if (request.data.success && request.data.message === "Movie Deleted Successfully") {
        // setUpdated(true);
        // todo getAllMovies
        router.replace("/admin/movies");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const postReview = async (reviewData) => {
    try {
      const request = await axios.post(`${process.env.APP_API_BASE_URL}/reviews`, 
        reviewData
      );

      if (request.data.success && request.data.message === "Review created successfully") {
        router.replace(`/movie/${reviewData?.movieId}`);
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
        updated,
        setUpdated,
        newMovie,
        updateMovie,
        deleteMovie,
        postReview,
        clearErrors,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
