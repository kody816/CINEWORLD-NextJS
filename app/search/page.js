"use client";
import React, { useState } from "react";

export default function SearchBar({ onSearch, onTyping, suggestions }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onTyping(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-6">
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          placeholder="Search movies or series..."
          value={input}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-full bg-neutral-900 border border-neutral-700 focus:outline-none focus:border-yellow-400 text-white placeholder-neutral-500 transition-all duration-200"
        />
      </form>

      {/* Suggestions Dropdown */}
      {suggestions?.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSearch(item.title || item.name);
                setInput(item.title || item.name);
              }}
              className="px-4 py-2 text-white hover:bg-neutral-800 cursor-pointer truncate"
            >
              {item.title || item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
