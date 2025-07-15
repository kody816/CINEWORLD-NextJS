export async function getMovieTitle(id) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
  if (!res.ok) return null;

  const data = await res.json();
  return data.title || null;
}
