export const config = {
  verify_jwt: false,
};

Deno.serve((_req: Request) => {
  return Response.redirect("exp://10.198.244.94:8081/--/login?approved=true", 302);
});
