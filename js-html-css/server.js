const handleHTML = async () => {
  const htmlFile = await Deno.readFile("template/index.html");
  return new Response(htmlFile, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const handleJS = async () => {
  const jsFile = await Deno.readFile("template/script.js");
  return new Response(jsFile, {
    headers: {
      "content-type": "text/js",
    },
  });
}

const handleCSS = async () => {
  const cssFile = await Deno.readFile("template/style.css");
  return new Response(cssFile, {
    headers: {
      "content-type": "text/css",
    },
  });
  
}

const handler = (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/index.html") {
    return handleHTML();
  }

  if (url.pathname === "/script.js") {
    return handleJS();
  }

  if (url.pathname === "/style.css") {
    return handleCSS();
  }

  return new Response("Not found")
};

Deno.serve({ port: 9000 }, handler);
