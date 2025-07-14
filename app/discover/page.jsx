"use client";
import React, { useEffect, useState } from "react";
import MediaRow from "@/components/MediaRow";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function DiscoverPage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popularTV, setPopularTV] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [trendingRes, topRatedRes, upcomingRes, popularTVRes] =
          await Promise.all([
            fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`),
            fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`),
            fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`),
            fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`),
          ]);

        const [trendData, topData, upData, tvData] = await Promise.all([
          trendingRes.json(),
          topRatedRes.json(),
          upcomingRes.json(),
          popularTVRes.json(),
        ]);

        setTrending(trendData.results || []);
        setTopRated(topData.results || []);
        setUpcoming(upData.results || []);
        setPopularTV(tvData.results || []);
      } catch (err) {
        console.error("Failed to load discovery data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="px-4 py-6 text-white">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Discover</h1>
      <MediaRow title="🔥 Trending Now" items={trending} type="movie" />
      <MediaRow title="⭐ Top Rated" items={topRated} type="movie" />
      <MediaRow title="🎬 Upcoming Movies" items={upcoming} type="movie" />
      <MediaRow title="📺 Popular TV Shows" items={popularTV} type="tv" />
    </div>
  );
}
