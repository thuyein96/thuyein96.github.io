const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;
    const pathname = parsedUrl.pathname;

    console.log(req.method, req.url, pathname, queryParams)
    if (req.method === 'GET' && pathname === '/echo') {
        const name = queryParams.name;
        res.end(`Hello, ${name}!`);
    } else if (req.method === 'POST' && pathname === '/echo') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body); // Parse the JSON body
            // res.end(`Received: ${body}`);
            res.end(`Hello, ${data.name}!`);
        });
    } else if (req.url === '/api/dog') {
        res.end("Looking for a dog?");
    } else if (req.url === '/api/cat') {
        res.end("Looking for a cat?");
    } else {
        res.end("Hello World")
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});