export const config = {
  verify_jwt: false,
};

Deno.serve((_req: Request) => {
  return Response.redirect("workertrust://login?approved=true", 302);
});
