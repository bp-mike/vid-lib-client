"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const [searchValue, setSearchValue] = useState("")

  const router = useRouter()

  const onSearch = () => {
    if(searchValue){
      router.push(`/?titleSearch=${searchValue}`)
    } else {
      router.push('/')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4">
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Enter your keyword"
        required
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="px-4 py-2 inline-block text-white border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
