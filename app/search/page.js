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
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = (searchValue) => {
    if (!searchValue) return;
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchValue}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result.results || []);
        setIsLoading(false);
        updateHistory(searchValue);
      });
  };

  const handleTyping = (value) => {
    setTypedValue(value);
  };

  const updateHistory = (term) => {
    let prev = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!prev.includes(term)) {
      prev.unshift(term);
      if (prev.length > 5) prev.pop();
      localStorage.setItem("searchHistory", JSON.stringify(prev));
      setSearchHistory(prev);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(saved);
  }, []);

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
    <div className="h-full px-4 pb-24">
      <SearchTitle />
      <SearchBar
        onSearch={handleSearch}
        onTyping={handleTyping}
        suggestions={suggestions}
      />

      {/* Recent Search History */}
      {searchHistory.length > 0 && (
        <div className="mt-4 text-sm text-neutral-400">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-white">Recent Searches</h3>
            <button
              className="text-xs text-red-400 hover:underline"
              onClick={clearHistory}
            >
              Clear
            </button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {searchHistory.map((term, idx) => (
              <li
                key={idx}
                className="bg-neutral-800 px-3 py-1 rounded-full text-white hover:bg-yellow-500 hover:text-black transition cursor-pointer"
                onClick={() => handleSearch(term)}
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Spinner or Results */}
      {isLoading ? (
        <div className="flex justify-center mt-12">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <SearchDisplay movies={data} />
      )}
    </div>
  );
};

export default Search;
