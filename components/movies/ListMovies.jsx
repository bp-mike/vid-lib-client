"use client";

import React from "react";
import Filters from "../layouts/Filters";
import CustomPagination from "../layouts/CustomPagination";

import MovieItem from "./MovieItem"

const ListMovies = ({ data }) => {
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {data.movies?.map((movie) => (
              <MovieItem key={movie?.id} movie={movie} />
            ))}

            <CustomPagination
              totalCount={data?.totalMovies}
              pageSize={data?.pageSize}
            />
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListMovies;
