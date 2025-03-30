const http = require("http");

const server = http.createServer((req, res) => {
 if (req.url === "/greet") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello, Node.js!');
    res.end();
}
else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Page Not Found');
    res.end();
}
});

const port = 3000;
const hostName = 'localhost';
server.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}`);
});