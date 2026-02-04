const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.jsx': return 'application/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.gif': return 'image/gif';
    case '.webp': return 'image/webp';
    default: return 'application/octet-stream';
  }
}

const server = http.createServer((req, res) => {
  // Add CORS and cache headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  
  // Normalize path
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Resolve file path
  const filePath = path.normalize(path.join(__dirname, reqPath));
  const projectDir = path.normalize(__dirname + path.sep);

  // Security check
  if (!filePath.startsWith(projectDir)) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // For all other routes, serve index.html (React Router handling)
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, 'utf8', (indexErr, data) => {
        if (indexErr) {
          res.statusCode = 404;
          res.end('File not found');
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(data);
      });
      return;
    }

    // Read and serve the file
    res.setHeader('Content-Type', contentType(filePath));
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    
    stream.on('error', () => {
      res.statusCode = 500;
      res.end('Server error');
    });
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 TechBlog server running at http://localhost:${port}`);
  console.log(`   Admin login: http://localhost:${port}/admin`);
  console.log(`   Dashboard: http://localhost:${port}/dashboard`);
});
