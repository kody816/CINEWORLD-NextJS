"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch, onTyping, suggestions = [] }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    onTyping(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
    onTyping(text);
    onSearch(text);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-4">
      <form onSubmit={handleSubmit} className="flex items-center bg-neutral-900 rounded-full overflow-hidden border border-neutral-700">
        <span className="px-4 text-neutral-400">
          <FaSearch />
        </span>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search movies or series..."
          className="flex-1 bg-transparent text-white py-3 px-2 focus:outline-none placeholder:text-neutral-500"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-r-full hover:bg-yellow-300 transition"
        >
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-neutral-900 border border-neutral-700 mt-1 rounded-lg max-h-64 overflow-y-auto shadow-lg">
          {suggestions.slice(0, 6).map((item) => (
            <li
              key={item.id}
              className="p-3 hover:bg-neutral-800 text-white cursor-pointer"
              onClick={() => handleSuggestionClick(item.title || item.name)}
            >
              {item.title || item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
