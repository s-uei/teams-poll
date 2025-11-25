Deno.serve(async (req) => {
  const text = await req.text();
  console.log(text);
  return new Response(
    JSON.stringify({
      type: "message",
      text,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
});
