import { useContext } from "react";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import CartContext from "@/context/CartContext";

const MovieItem = ({ movie }) => {
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart({
      movie: movie.id,
      title: movie.title,
      price: movie.price,
      image: movie.image,
    });
  };
  return (
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 flex p-3">
          <div
            style={{
              width: "80%",
              height: "70%",
              position: "relative",
            }}
          >
            <Image
              src={movie?.image ? movie?.image : "/images/default_movie.png"}
              alt="movie name"
              height="240"
              width="240"
            />
          </div>
        </div>
        <div className="md:w-2/4">
          <div className="p-4">
            <Link href={`/movie/${movie?.id}`} className="hover:text-blue-600">
              {movie?.title}
            </Link>
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
                  <StarRatings
                    rating={movie?.ratings}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="18px"
                    starSpacing="1px"
                    name="rating"
                  />
                </div>
              </div>
              <b className="text-gray-300">•</b>
              <span className="ml-1 text-yellow-500">{movie?.ratings}</span>
            </div>
            <p className="text-gray-500 mb-2">
              {movie?.description.substring(0, 150)}...
            </p>
          </div>
        </div>
        <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="p-5">
            <span className="text-xl font-semibold text-black">
              ${movie?.price}
            </span>

            <p className="text-green-500"></p>
            <div className="my-3">
              <a
                className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
                onClick={addToCartHandler}
              >
                {" "}
                Add to Cart{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MovieItem;
