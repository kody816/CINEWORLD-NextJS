"use client";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ onSearch, onTyping, suggestions }) => {
  const searchBarRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleTyping = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onTyping(value); // tell parent the new text
  };

  const handleSuggestionClick = (title) => {
    setSearchValue(title);
    onSearch(title); // search on click
  };

  useEffect(() => {
    searchBarRef?.current?.focus?.();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-6 px-4 w-full relative">
      <div className="flex w-full max-w-xl">
        <input
          value={searchValue}
          type="text"
          name="search"
          id="search"
          placeholder="Search for movies or series..."
          className="w-full rounded-l-md px-4 py-3 bg-grey text-white outline-none placeholder:text-light-white"
          onChange={handleTyping}
          autoComplete="off"
          ref={searchBarRef}
        />
        <button
          aria-label="Search"
          onClick={handleSearch}
          className="px-6 py-3 bg-primary text-black font-bold rounded-r-md hover:bg-yellow-300 transition"
        >
          <BiSearch className="inline text-2xl" />
        </button>
      </div>

      {/* 🔽 Suggestions dropdown */}
      {suggestions?.length > 0 && (
        <ul className="absolute top-[100%] mt-1 w-full max-w-xl bg-[#1f1f1f] rounded-md shadow-lg z-50">
          {suggestions.slice(0, 5).map((item) => (
            <li
              key={item.id}
              onClick={() => handleSuggestionClick(item.title || item.name)}
              className="cursor-pointer px-4 py-2 text-white hover:bg-grey border-b border-gray-700 last:border-none"
            >
              {item.title || item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
