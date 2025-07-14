"use client";
import React, { useEffect, useState } from "react";
import MediaRow from "@/components/MediaRow";

export default function DiscoverPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        const [popularMoviesRes, popularSeriesRes, topMoviesRes, topSeriesRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`),
          fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`),
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`),
          fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`),
        ]);

        const [popularMoviesData, popularSeriesData, topMoviesData, topSeriesData] = await Promise.all([
          popularMoviesRes.json(),
          popularSeriesRes.json(),
          topMoviesRes.json(),
          topSeriesRes.json(),
        ]);

        setPopularMovies(popularMoviesData.results || []);
        setPopularSeries(popularSeriesData.results || []);
        setTopRatedMovies(topMoviesData.results || []);
        setTopRatedSeries(topSeriesData.results || []);
      } catch (err) {
        console.error("Failed to load discovery data:", err);
      }
    }

    fetchData();
  }, [apiKey]);

  return (
    <div className="px-4 pt-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Discover</h1>

      <MediaRow title="Popular Movies" items={popularMovies} type="movie" />
      <MediaRow title="Popular TV Series" items={popularSeries} type="tv" />
      <MediaRow title="Top Rated Movies" items={topRatedMovies} type="movie" />
      <MediaRow title="Top Rated TV Series" items={topRatedSeries} type="tv" />
    </div>
  );
}
