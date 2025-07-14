import MovieCards from "@/components/display/MovieCards";
import Pagination from "@/components/display/Pagination";

export default async function TrendingMoviesPage({ params }) {
  const page = params.pageid || 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();

  return (
    <main className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
      <MovieCards results={data.results} />
      <Pagination currentPage={parseInt(page)} basePath="/all/trending/page" totalPages={500} />
    </main>
  );
}
