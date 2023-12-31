"use client";

import axios from "axios";
import AuthContext from "@/context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, error, loading, updateProfile, clearErrors } =
    useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default.png");

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setAvatar(user.user.avatar);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ id }) => id === "formFile"
    );

    let avatarUrl = ""

    if(fileInput.files.length > 0){
      const file = new FormData();
      file.append("file", fileInput.files[0]);
      file.append("upload_preset", "my-uploads");
  
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dbsnwtry7/image/upload",
        {
          method: "POST",
          body: file,
        }
      ).then((r) => r.json());
  
      avatarUrl = cloudinaryResponse.secure_url;
      setAvatar(avatarUrl);     
    }
    // console.log();
    const formData = {
      userName: name,
      email: email,
      avatar: avatarUrl !== "" ? avatarUrl : avatar, 
    };
    setAvatar(avatarUrl);
    console.log(avatar);
    updateProfile(formData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        // setAvatarPreview(reader.result);
        // setAvatar(reader.result);  // Set avatar after the file has been read
        setAvatarPreview(reader.result); //TODO set image for preview else get one from the link(cloudinary)
      }
    };

    // setAvatar(e.target.files[0]);
    // reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={submitHandler} onChange={onChange}>
          <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

          <div className="mb-4">
            <label className="block mb-1"> User Name </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Email </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Avatar </label>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                <img className="w-14 h-14 rounded-full" src={avatarPreview} />
              </div>
              <div className="md:w-2/3 lg:w-80">
                <input
                  className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                  type="file"
                  id="formFile"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            disabled={loading ? true : false}
          >
            {/* onClick={submitHandler} */}
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
