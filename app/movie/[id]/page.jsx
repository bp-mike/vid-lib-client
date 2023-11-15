import MovieDetails from "@/components/movies/MovieDetails";
import axios from "axios";
import React from "react";

const getMovieDetails = async (id) => {
    let movie
      try {
        let request = await axios.get(`${process.env.APP_API_BASE_URL}/movies/${id}`)
        if(request.data.success && request.data.message === "movie Fetched Successfully") {
          return movie = request.data.movie
        }
      } catch (error) {
        console.log(error);
        throw "An unexpected Error occurred, please try again"
      }
      return movie
    };

const MovieDetailsPage = async ({ params }) => {
  const movie = await getMovieDetails(params.id);

  return <MovieDetails movie={movie} />;
};

export default MovieDetailsPage;
