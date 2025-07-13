'use client';
import SearchDisplay from "@/components/display/SearchDisplay";
import SearchBar from "@/components/searchbar/SearchBar";
import SearchTitle from "@/components/title/SearchTitle";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Search = () => {
  const [data, setData] = useState([]);
  const [typedValue, setTypedValue] = useState("");

  // Triggered on button click
  const handleSearch = (searchValue) => {
    const getData = async () => {
      if (searchValue !== "") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchValue}`
        );
        const result = await res.json();
        setData(result.results);
      }
    };
    getData();
  };

  // Triggered on typing
  const handleTyping = (typedValue) => {
    setTypedValue(typedValue);
  };

  const [value] = useDebounce(typedValue, 1000);

  useEffect(() => {
    const getData = async () => {
      if (typedValue !== "") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${value}`
        );
        const result = await res.json();
        setData(result.results);
      }
    };
    getData();
  }, [value]);

  return (
    <div className="h-full">
      <SearchTitle />
      <SearchBar onSearch={handleSearch} onTyping={handleTyping} />
      <SearchDisplay movies={data} />
    </div>
  );
};

export default Search;
