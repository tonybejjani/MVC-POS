/** @format */
// Build a small server
// Build a small API
const fs = require('fs');
const http = require('http');
const url = require('url');
const cors = require('cors');

//reading data
const data = fs.readFileSync(`${__dirname}/dev-data/data-yumcha.json`, 'utf-8');
const dataObj = JSON.parse(data);

cors({ origin: '*' });

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('this is the OVERVIEW.');
  } else if (pathName === '/product') {
    res.end('this is the PRODUCT');
  } else if (pathName === '/api') {
    //res.writeHead('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'this is my own header',
    });

    res.end('<h1>Page not found!</h1>');
  }
});

server.listen('8000', '127.0.0.1', () => {
  console.log('server listening at port 8000...');
});
