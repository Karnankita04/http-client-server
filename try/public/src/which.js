const listener = Deno.listen({ port: 8000 });
const encoder = new TextEncoder();

for await (const connection of listener) {
  const body = encoder.encode("<h1>hello Something</h1>");

  const { value } = await connection.readable.getReader().read();

  const decoded = new TextDecoder().decode(value).split("\n");
  const requestLine = decoded[0].match(/.+\s\/(.+)\s.+\/1.1/)[1];
  console.log(requestLine);
  let statusCode = 404;
  if (requestLine === "Ankita") {
    statusCode = 200;
  }
  const msg = `HTTP/1.1 ${statusCode} OK\r\nContent-Type: text/html\r\nContent-Length: ${body.length}\r\n\r\n`;

  await connection.write(encoder.encode(msg));
  await connection.write(body);
}
