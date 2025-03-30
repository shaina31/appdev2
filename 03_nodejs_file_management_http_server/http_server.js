const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const EventEmitter = require('events');
class FileEvent extends EventEmitter {}
const fileEvent = new FileEvent();

const port = 3000;
const host = 'localhost';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const filename = query.filename;

    if (!filename) {
        res.statusCode = (400, { "Content-Type": "text/plain" });
        res.end('Filename is required.');
        return;
    }

    const filepath = path.join(__dirname, filename);

    if (pathname === '/create') {
        fs.writeFile(filepath, 'New file created.', (err) => {
            if (err) {
                res.statusCode(500);
                return res.end('Error creating file');
            } else {
                fileEvent.emit('log', `File created:`, filename);
                res.statusCode(200);
                res.end('File created successfully');
    }
});
    } else if (pathname === '/read') {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode(500);
                res.end('File not found');
            } else {
                res.statusCode(200, { 'Content-Type': 'text/plain' });
                res.end(data);
    }
});
    } else if (pathname === '/update') {
        const contents  = query.contents || '';
        fs.appendFile(filepath, contents, (err) => {
            if (err) {
                res.statusCode(500);
                res.end('Error updating file');
            } else {
                fileEvent.emit('log', `File updated:`,filename);
                res.statusCode(200);
                res.end('File updated successfully');
        }
    });

    } else if (pathname === '/delete') {
        fs.unlink(filepath, (err) => {
            if (err) {
                res.statusCode(500);
                res.end('File not found');
            } else {
                fileEvent.emit('log', `File deleted:`, filename);
                res.statusCode(200);
                res.end('File deleted successfully');
        }});
    } else {
        res.statusCode(404);
        res.end('Invalid request');
    }
});

server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});


