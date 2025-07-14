import MovieCards from "@/components/display/MovieCards";
import Pagination from "@/components/display/Pagination";

export default async function NewReleasesPage({ params }) {
  const page = params.pageid || 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();

  return (
    <main className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">New Releases</h1>
      <MovieCards results={data.results} />
      <Pagination currentPage={parseInt(page)} basePath="/all/releases/page" totalPages={241} />
    </main>
  );
}
