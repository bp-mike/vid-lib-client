"use client";

import MovieContext from "@/context/MovieContext";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const UpdateMovie = ({ movie }) => {
  const { updateMovie, error, updated, setUpdated, clearErrors } = useContext(MovieContext);

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [director, setDirector] = useState(movie.director);
  const [price, setPrice] = useState(movie.price);
  const [ratings, setRatings] = useState(movie.ratings);
  const [genre, setGenre] = useState(movie.genre);
  const [image, setImage] = useState(movie.image);

  useEffect(() => {
    if (updated) {
      toast.success("Movie Updated");
      setUpdated(false);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated]);

  
  const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime"];

  const submitHandler = async (e) => {
    e.preventDefault();
    // Upload image to Cloudinary
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(({ id }) => id === "formFile");

    let imageUrl = image;

    if (fileInput.files.length > 0) { // TODO put this in helper & make one that deletes the image from cloudinary
      const file = new FormData();
      file.append("file", fileInput.files[0]);
      file.append("upload_preset", "my-uploads");

      try {
        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dbsnwtry7/image/upload",
          {
            method: "POST",
            body: file,
          }
        ).then((r) => r.json());

        imageUrl = cloudinaryResponse.secure_url;
        setImage(imageUrl)
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        // Handle the error, show a message, etc.
      }
    }

    const updatedMovie = {
      title,
      description,
      director,
      price: parseFloat(price), // Ensure price is a number
      ratings: parseFloat(ratings), // Ensure ratings is an integer
      genre,
      image: imageUrl, // Include the image URL
    };

    updateMovie(updatedMovie, movie.id);
  };

  return (
    <section className="container max-w-3xl p-6 mx-auto">
      <h1 className="mb-3 text-xl md:text-3xl font-semibold text-black mb-8">
        Update Movie
      </h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1"> Title </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Movie Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 mt-5">
          <label className="block mb-1"> Description </label>
          <textarea
            rows="4"
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            placeholder="Movie description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1"> Price </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  placeholder="0.00"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1"> Genre </label>
            <div className="relative">
              <select
                className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">Select a Genre</option>
                {genres.map((genreOption) => (
                  <option key={genreOption} value={genreOption} selected={genre === genreOption}>
                    {genreOption}
                  </option>
                ))}
              </select>
              <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                <svg
                  width="22"
                  height="22"
                  className="fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z"></path>
                </svg>
              </i>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1"> Director </label>
            <input
              type="text"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              placeholder="Director"
              name="director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Ratings </label>
            <div className="relative">
              <div className="col-span-2">
                <input
                  type="text"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  placeholder="0"
                  name="ratings"
                  value={ratings}
                  onChange={(e) => setRatings(e.target.value)}
                  disabled
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <div className="mb-4">
            <label className="block mb-1"> Image </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              placeholder="Seller or brand"
              name="image"
              type="file"
              id="formFile"
            />
          </div> 
          {/* TODO image preview */}
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Update Movie
        </button>
      </form>
    </section>
  );
};

export default UpdateMovie;
