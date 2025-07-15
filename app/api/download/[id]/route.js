import { getMovieTitle } from "@/lib/getMovieTitle";
import { searchDownloadWella } from "@/lib/searchDownloadWella";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const title = await getMovieTitle(id);
    if (!title) throw new Error("No title found");

    const wellaLink = await searchDownloadWella(title);
    if (wellaLink) {
      return Response.redirect(wellaLink, 302);
    }

    // fallback to vidsrc if Wella fails
    const fallback = `https://dl.vidsrc.vip/movie/${id}`;
    return Response.redirect(fallback, 302);
  } catch (err) {
    console.error("Download redirect error:", err);
    return new Response("Download link not found", { status: 404 });
  }
}
