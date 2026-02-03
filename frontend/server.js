const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8000;

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  // Normalize and resolve the requested path relative to the project dir.
  // Prefix with '.' so that leading slashes in reqPath don't make it absolute on Windows.
  const filePath = path.normalize(path.join(__dirname, '.' + reqPath));

  // Prevent path traversal: ensure resolved path starts with the project directory
  const projectDir = path.normalize(__dirname + path.sep);
  if (!filePath.startsWith(projectDir)) {
    res.statusCode = 400;
    return res.end('Bad request');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      return res.end('Not found');
    }

    res.setHeader('Content-Type', contentType(filePath));
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Static server running at http://localhost:${port}`);
});
