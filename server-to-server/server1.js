const handleHTML = async () => {
  const html = await Deno.readFile("template/index.html");
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const handler = (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/template/index.html") {
    return handleHTML(request);
  }

  return new Response("not found", {
    status: 404,
  });
};

Deno.serve({ port: 8080 }, handler);
