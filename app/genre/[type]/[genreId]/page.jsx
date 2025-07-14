import MovieCards from "@/components/display/MovieCards";

async function getGenreResults(type, genreId) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results || [];
}

export default async function GenrePage({ params, searchParams }) {
  const { type, genreId } = params;
  const genreName = searchParams?.name || "Genre";

  const results = await getGenreResults(type, genreId);

  return (
    <main className="text-white px-4 pb-16">
      <h1 className="text-2xl font-bold mb-4">
        {genreName} ({type === "movie" ? "Movies" : "TV Series"})
      </h1>

      {results?.length > 0 ? (
        <MovieCards results={results} />
      ) : (
        <p className="text-gray-400">No results found.</p>
      )}
    </main>
  );
}
