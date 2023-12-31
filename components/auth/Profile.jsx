"use client";

import React, { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user?.user?.avatar ? user?.user?.avatar : "/images/default.png"}
            alt={user?.user?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.user?.name}</h5>
          <p>
            <b>Email:</b> {user?.user?.email} | <b>Joined On:</b>
            {user?.user?.createdAt?.substring(0, 10)}
          </p>
        </figcaption>
      </figure>

      {/* <hr className="my-4" /> */}

      <hr className="my-4" />
    </>
  );
};

export default Profile;
