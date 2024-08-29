import { createServer } from "node:http";

const hostname = "127.0.0.1";
const port = process.env.PORT || 10000;

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);

  if (url.pathname === "/proxy-api") {
    const endPoint = url.searchParams.get("url");

    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        data: json,
      }),
    );
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      data: [],
    }),
  );
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

