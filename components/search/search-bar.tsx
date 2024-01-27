"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form
      className="flex justify-center relative w-2/5 rounded-full outline outline-2 ml-1"
      onSubmit={onSearch}
    >
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder={"Search"}
        className="h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none"
      />
    </form>
  );
};
export default SearchBar;
