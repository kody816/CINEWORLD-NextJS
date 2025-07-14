export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return new Response("Movie ID missing", { status: 400 });
  }

  const redirectUrl = `https://dl.vidsrc.vip/movie/${id}`;
  return Response.redirect(redirectUrl, 302);
}
