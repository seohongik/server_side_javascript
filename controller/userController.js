const userController= {
    getUser: function getUser(req, res) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({id: 1, name: "Alice"}));
    },
    createUser: function createUser(req, res) {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const user = JSON.parse(body);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({message: "User created", user}));
        });
    }
}

export default userController;