"use client";
import React from "react";

export default function Banner() {
  return (
    <div className="bg-[url('/banner.jpg')] bg-cover bg-center h-[250px] md:h-[400px] rounded-md mb-6 flex items-end p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
        Welcome to CineWorld 🍿
      </h1>
    </div>
  );
}
