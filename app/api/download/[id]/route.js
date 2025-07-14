export async function GET(request, { params }) {
  const { id } = params;
  const url = `https://dl.vidsrc.vip/movie/${id}`;

  return Response.redirect(url, 302);
}
