<!-- TODO stop requests going over & over again -->


"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import ListMovies from "@/components/movies/ListMovies";
import queryString from "query-string";
import { useSession } from "next-auth/react";

const getMovies = async (searchParams, token) => {
  const urlParams = {
    titleSearch: searchParams.titleSearch,
    page: searchParams.page,
    genre: searchParams.genre,
    ratings: searchParams.ratings,
    minPrice: searchParams.min,
    maxPrice: searchParams.max,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    const response = await axios.get(
      `${process.env.APP_API_BASE_URL}/movies?${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (
      response.data.success &&
      response.data.message === "Movies Fetched Successfully"
    ) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw "An unexpected Error occurred, please try again";
  }
};

const HomePage = ({ searchParams }) => {
  const { data } = useSession()
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(data){
          setToken(data?.user?.jwt)
        }
        const result = await getMovies(searchParams, token);
        setMovies(result);
      } catch (error) {
        console.error(error);
        // Handle error appropriately (e.g., show an error message to the user)
      }
    };

    fetchData();
  }, [searchParams, data]);

  return movies ? <ListMovies data={movies} /> : <p>Loading...</p>;
};

export default HomePage;


##======================================
stored session data 
{
    "user": {
        "user": {
            "id": 3,
            "name": "RobertJohnson",
            "email": "robert.johnson@example.com",
            "createdAt": "2023-11-12T14:14:12.150Z"
        },
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlck5hbWUiOiJSb2JlcnRKb2huc29uIiwiZW1haWwiOiJyb2JlcnQuam9obnNvbkBleGFtcGxlLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMTEtMTJUMTQ6MTQ6MTIuMTUwWiIsImlhdCI6MTcwMDExNTQ5NywiZXhwIjoxNzAwMTE5MDM3fQ.EK6RS9D6nLx_KENGJn8P-hVkQWYVFRlDupVu833n4uM"
    },
    "expires": "2023-12-16T06:22:21.666Z"
}