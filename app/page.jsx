import axios from "axios";
import ListMovies from "@/components/movies/ListMovies";
import queryString from "query-string";

const getMovies = async (searchParams) => {
  const urlParams = {
    titleSearch: searchParams.titleSearch,
    page: searchParams.page,
    genre: searchParams.genre,
    ratings: searchParams.ratings,
    minPrice: searchParams.min,
    maxPrice: searchParams.max,
  };

  const searchQuery = queryString.stringify(urlParams);

  let data
    try {
      let request = await axios.get(`${process.env.APP_API_BASE_URL}/movies?${searchQuery}`)
      if(request.data.success && request.data.message === "Movies Fetched Successfully") {
        return data = request.data
      }
    } catch (error) {
      console.log(error);
      throw "An unexpected Error occurred, please try again"
    }
    return data
  };

const HomePage = async ({ searchParams }) => {
    const data = await getMovies(searchParams)
    return <ListMovies data={data} />;
}

export default HomePage

/*
import axios from "axios";
import ListMovies from "@/components/movies/ListMovies";

const getMovies = async (searchParams) => {
  const searchValue = searchParams.titleSearch ?? ""
  let data
    try {
      let request = await axios.get(`${process.env.APP_API_BASE_URL}/movies?titleSearch=${searchValue}$page=${searchParams.page}&pageSize=${searchParams.pageSize}`)
      if(request.data.success && request.data.message === "Movies Fetched Successfully") {
        return data = request.data
      }
    } catch (error) {
      console.log(error);
      throw "An unexpected Error occurred, please try again"
    }
    return data
  };

const HomePage = async ({ searchParams }) => {
    const data = await getMovies(searchParams)
    return <ListMovies data={data} />;
}

export default HomePage
*/