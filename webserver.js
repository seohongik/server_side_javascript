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


import { createServer } from "node:http";
import userController from "./controller/userController.js";
import url from "url";
const hostname = '127.0.0.1';
const port = 3000;
const server =createServer((req, res) => {
    res.statusCode = 200;
    const parsedUrl = url.parse(req.url, true); // url 파싱
    const path = parsedUrl.pathname;
    const reqMethod =req.method;
    if (path === '/user'&&reqMethod.toUpperCase()==="GET") {
        userController.getUser(req,res);
        userController.createUser(req,res);
    }else {
        res.statusCode=200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Hello Node");
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});