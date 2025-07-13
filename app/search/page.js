"use client";
import SearchDisplay from "@/components/display/SearchDisplay";
import SearchBar from "@/components/searchbar/SearchBar";
import SearchTitle from "@/components/title/SearchTitle";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Search = () => {
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [typedValue, setTypedValue] = useState("");
  const [value] = useDebounce(typedValue, 500);

  const handleSearch = (searchValue) => {
    if (!searchValue) return;
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchValue}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result.results || []);
      });
  };

  const handleTyping = (value) => {
    setTypedValue(value);
  };

  useEffect(() => {
    if (value) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${value}`
      )
        .then((res) => res.json())
        .then((result) => {
          setSuggestions(result.results || []);
        });
    } else {
      setSuggestions([]);
    }
  }, [value]);

  return (
    <div className="h-full">
      <SearchTitle />
      <SearchBar
        onSearch={handleSearch}
        onTyping={handleTyping}
        suggestions={suggestions}
      />
      <SearchDisplay movies={data} />
    </div>
  );
};

export default Search;
