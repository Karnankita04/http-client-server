const handleHTML = (name, value) => {
  const file = Deno.readFileSync("./public/template/index.html");
  const content = new TextDecoder().decode(file);
  const result = name ? content.replaceAll("${name}", value) : content;
  return new Response(result, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const handleCSS = (name) => {
  console.log(name, "hello hello");

  const file = Deno.readFileSync("./public/css/style.css");
  return new Response(file, {
    headers: {
      "content-type": "text/css",
    },
  });
};

const handler = (request) => {
  console.log("request url ", request.url);

  const url = new URL(request.url);
  console.log("url instance ", url);
  const [name, value] = url.search.replace("?", "").split("=");

  if (url.pathname === "/public/template/index.html") {
    return handleHTML(name, value);
  }

  if (url.pathname === "/public/css/style.css") {
    return handleCSS(name);
  }

  return new Response("not found", {
    status: 404,
  });
};

Deno.serve(handler);
