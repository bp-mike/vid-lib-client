import axios from "axios";
import UpdateMovie from "@/components/admin/UpdateMovie";

const getMovie = async (id) => {
  try {
    let request = await axios.get(
      `${process.env.APP_API_BASE_URL}/movies/${id}`
    );
    if (
      request.data.success &&
      request.data.message === "movie Fetched Successfully"
    ) {
      return request.data;
    }
  } catch (error) {
    console.log(error);
    throw "An unexpected Error occurred, please try again";
  }
};

const UpdateMoviePage = async ({ params }) => {
  const data = await getMovie(params.id);

  return <UpdateMovie movie={data.movie} />;
};

export default UpdateMoviePage;
