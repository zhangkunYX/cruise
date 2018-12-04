const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./mock-server/db.json');
const middlewares = jsonServer.defaults({
    "static": "./dist"
});

server.use(middlewares);
server.use(router);
server.listen(5000, () => {
    console.log('cruise server is running in localhost:5000');
});