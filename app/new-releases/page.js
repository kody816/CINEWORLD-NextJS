import MovieCards from "@/components/display/MovieCards";

export const dynamic = "force-dynamic";

export default async function NewReleasesPage() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
  const data = await res.json();
  const results = data.results || [];

  return (
    <main className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">New Releases</h1>
      <MovieCards results={results} />
    </main>
  );
}
