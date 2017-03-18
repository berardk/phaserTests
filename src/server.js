const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = express()
.use(express.static(__dirname + '/public'))
.listen(port, () => console.log(`Listening on ${ port }`));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
