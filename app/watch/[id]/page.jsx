// app/watch/[id]/page.jsx
import Image from "next/image";
import React from "react";

async function getData(id) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );

  if (movieRes.ok) {
    const data = await movieRes.json();
    return { ...data, type: "movie" };
  }

  const tvRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
  );
  if (tvRes.ok) {
    const data = await tvRes.json();
    return { ...data, type: "tv" };
  }

  throw new Error("Failed to fetch media");
}

export default
