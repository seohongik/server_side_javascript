/*//const { createServer } = require('node:http'); //디스트럭처 할당
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json'); // 'text/plain'
    const json = "{key:'key',value:'value'}";
    res.end(json);
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    // hello node.js
});*/

const server= require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
server.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json'); // 'text/plain'
    const json = "{key:'key',value:'value'}";
    res.end(json);
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    // hello node.js
});