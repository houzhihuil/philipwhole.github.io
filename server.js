const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html'; // Change this to your HTML file
  }

  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
  };

  const extname = path.extname(filePath);
  const contentTypeValue = contentType[extname] || 'text/plain';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentTypeValue });
      res.end(content, 'utf-8');
    }
  });
});

const port = process.env.PORT || 8000; // Change the port as needed
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
