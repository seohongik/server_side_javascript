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
const hostname = '127.0.0.1';
const port = 3000;
const server =createServer((req, res) => {
    res.statusCode = 200;
    const reqMethod =req.method;
    const myURL = new URL(req.url, `http://${req.headers.host}`);
    const querystring = Object.fromEntries(myURL.searchParams) || { name: "null" };

    if (myURL.pathname === '/user'&&reqMethod.toUpperCase()==="GET") {
        userController.getUser(req, res, querystring);
        //userController.createUser(req,res); 유알엘 분리 동시에 처리하면 크랙나서 서버 죽음
    }else if (myURL.pathname === '/user' && reqMethod.toUpperCase() === "POST") {
        userController.createUser(req, res);
    }else {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(querystring));
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});