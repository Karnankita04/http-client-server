const handleCSS = async () => {
  const css = await Deno.readFile("css/style.css");
  return new Response(css, {
    headers: {
      "content-type": "text/css",
    },
  });
};

const handler = (request) => {
  const url = new URL(request.url);
  console.log(url.pathname);
  
  if (url.pathname === "/css/style.css") {
    return handleCSS();
  }

  return new Response("not found", {
    status: 404,
  });
};

Deno.serve({ port: 8000 }, handler);
