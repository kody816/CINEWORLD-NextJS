"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SearchDisplay from "@/components/display/SearchDisplay";
import SearchBar from "@/components/searchbar/SearchBar";
import SearchTitle from "@/components/title/SearchTitle";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Search = () => {
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [typedValue, setTypedValue] = useState("");
  const [value] = useDebounce(typedValue, 500);

  const handleSearch = (searchValue) => {
    if (!searchValue) return;
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchValue}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.results || []);
        setSuggestions([]);
      });
  };

  const handleTyping = (val) => {
    setTypedValue(val);
  };

  useEffect(() => {
    if (value) {
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${value}`)
        .then((res) => res.json())
        .then((result) => {
          setSuggestions(result.results || []);
        });
    } else {
      setSuggestions([]);
    }
  }, [value]);

  return (
    <main className="flex-1 px-4 pt-4 pb-24 md:pb-32 text-white">
      <SearchTitle />
      <SearchBar onSearch={handleSearch} onTyping={handleTyping} suggestions={suggestions} />
      <SearchDisplay movies={data} />
    </main>
  );
};

export default Search;
