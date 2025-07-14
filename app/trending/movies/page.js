import MovieCards from "@/components/display/MovieCards";

export const dynamic = "force-dynamic";

export default async function TrendingMoviesPage() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
  const data = await res.json();
  const results = data.results || [];

  return (
    <main className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
      <MovieCards results={results} />
    </main>
  );
}
