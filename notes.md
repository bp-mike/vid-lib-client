<!-- TODO stop requests going over & over again -->
<!-- Check ToDO   //TODO follow new movie method -->
<!-- TODO npm package i next with deps(mantine, tailwind,..) -->
<!-- TODO toast for del, patch & post reqs -->
//== test cards
RobertJohnson
4242424242424242 visa
40000566556655564000056655665556 visa(debit)
5555555555554444 mastercard

"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import ListMovies from "@/components/movies/ListMovies";
import queryString from "query-string";
import { useSession } from "next-auth/react";

<!-- TODO explore using authContext -->

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
            "id": 2,
            "name": "RobertJohnson",
            "email": "robert.johnson@example.com",
            "avatar": "https://res.cloudinary.com/dbsnwtry7/image/upload/v1700169069/vidlib/lg3ikir2ngfvy4imdhba.jpg",
            "role": "user",
            "createdAt": "2023-11-16T13:05:15.849Z"
        },
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlck5hbWUiOiJSb2JlcnRKb2huc29uIiwiZW1haWwiOiJyb2JlcnQuam9obnNvbkBleGFtcGxlLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Ric253dHJ5Ny9pbWFnZS91cGxvYWQvdjE3MDAxNjkwNjkvdmlkbGliL2xnM2lraXIybmdmdnk0aW1kaGJhLmpwZyIsInJvbGUiOiJ1c2VyIiwiY3JlYXRlZEF0IjoiMjAyMy0xMS0xNlQxMzowNToxNS44NDlaIiwiaWF0IjoxNzAwMjI2NTY3LCJleHAiOjE3MDA0ODU3Njd9.bfs3Uo_TQcjefY9GassDfH5ELrTT3iKiMEc7LZSQs6Y"
    },
    "expires": "2023-12-18T22:05:14.797Z"
}
##======================================
updated user obj formdata 
{
    "formData": {
        "userName": "RobertJohnson",
        "email": "robert.johnson@example.com",
        "avatar": {}
    }
}

##======================================
set up cloudinary work environment

npm i @cloudinary/url-gen @cloudinary/react

import {Cloudinary} from "@cloudinary/url-gen";

const App = () => {
  const cld = new Cloudinary({cloud: {cloudName: 'dbsnwtry7'}});
};