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
  return <ListMovies data={data} />;
};

export default HomePage;
