import React from "react";
import axios from "axios";

import queryString from "query-string";
import Movies from "@/components/admin/Movies";

const getMovies = async (searchParams) => {
  const urlParams = {
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    let request = await axios.get(
      `${process.env.APP_API_BASE_URL}/movies?${searchQuery}`
    );
    if (
      request.data.success &&
      request.data.message === "Movies Fetched Successfully"
    ) {
      return request.data;
    }
  } catch (error) {
    console.log(error);
    throw "An unexpected Error occurred, please try again";
  }
};

const HomePage = async ({ searchParams }) => {
  const data = await getMovies(searchParams);

  return <Movies data={data} />;
};

export default HomePage;
