const http = require("http");

const url = require("url");

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true); // Set CORS headers

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Handle preflight requests

  if (req.method === "OPTIONS") {
    res.writeHead(204);

    res.end();

    return;
  }

  if (reqUrl.pathname === "/" && req.method === "GET") {
    res.end("Hello");
  } else if (reqUrl.pathname === "/add" && req.method === "GET") {
    const { num1, num2 } = reqUrl.query;

    if (num1 && num2) {
      const result = parseFloat(num1) + parseFloat(num2);

      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          operation: "add",
          num1: parseFloat(num1),
          num2: parseFloat(num2),
          result,
        })
      );
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });

      res.end(JSON.stringify({ error: "Please provide num1 and num2" }));
    }
  } else if (reqUrl.pathname === "/subtract" && req.method === "GET") {
    const {num1, num2 } = reqUrl.query;

        if (num1 && num2) {
            const result = parseFloat(num1) - parseFloat(num2);
            res.writeHead(200, { "Content-Type": "application/json" });

            res.end(
                JSON.stringify({
                    operation: "subtract",
                    num1: parseFloat(num1),
                    num2: parseFloat(num2),
                    result,
                })
            );
        }
  } else if (reqUrl.pathname === "/multiply" && req.method === "GET") {
    const {num1, num2 } = reqUrl.query;

        if(num1 && num2) {
            const result = parseFloat(num1) * parseFloat(num2);
            res.writeHead(200, { "Content-Type": "application/json" });

            res.end(
                JSON.stringify({
                    operation: "multiply",
                    num1: parseFloat(num1),
                    num2: parseFloat(num2),
                    result,
                })
            );
        }
  } else if (reqUrl.pathname === "/divide" && req.method === "GET") {
    const {num1, num2 } = reqUrl.query;

        if(num1 && num2) {
            let result;
            if(num2 === 0) {
                result = "Divided by zero!";
            } else {
                result = parseFloat(num1) / parseFloat(num2);
            }
            res.writeHead(200, { "Content-Type": "application/json" });

            res.end(
                JSON.stringify({
                    operation: "divide",
                    num1: parseFloat(num1),
                    num2: parseFloat(num2),
                    result,
                })
            );
        }
  } else if (reqUrl.pathname === "/api/add" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { num1, num2 } = JSON.parse(body);

      if (num1 && num2) {
        const result = parseFloat(num1) + parseFloat(num2);
        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({
            opt: "add",
            num1: parseFloat(num1),
            num2: parseFloat(num2),
            result,
          })
        );
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });

        res.end(JSON.stringify({ error: "Please provide num1 and num2" }));
      }
    });
  } else if (reqUrl.pathname === "/api/subtract" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { num1, num2 } = JSON.parse(body);

      if (num1 && num2) {
        const result = parseFloat(num1) - parseFloat(num2);
        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({
            opt: "subtract",
            num1: parseFloat(num1),
            num2: parseFloat(num2),
            result,
          })
        );
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });

        res.end(JSON.stringify({ error: "Please provide num1 and num2" }));
      }
    });
  } else if (reqUrl.pathname === "/api/multiply" && req.method === "POST") {
    
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { num1, num2 } = JSON.parse(body);

      if (num1 && num2) {
        const result = parseFloat(num1) * parseFloat(num2);
        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({
            opt: "multiply",
            num1: parseFloat(num1),
            num2: parseFloat(num2),
            result,
          })
        );
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });

        res.end(JSON.stringify({ error: "Please provide num1 and num2" }));
      }
    });
  } else if (reqUrl.pathname === "/api/divide" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => { body += chunk.toString(); });
    req.on("end", () => {
      let payload;
      try {
        payload = JSON.parse(body || "{}");
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }

      const a = parseFloat(payload.num1);
      const b = parseFloat(payload.num2);

      if (!Number.isFinite(a) || !Number.isFinite(b)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "num1 and num2 must be numbers" }));
      }
      if (b === 0) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Cannot divide by zero" }));
      }

      const result = a / b;
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ opt: "divide", num1: a, num2: b, result }));
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });

    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
