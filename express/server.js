console.log('Loading ONJS http server');
// We load built in http server and express server
const http = require('http');
const app = require('./express_web');
// we load the port from the .env file if we dont have that we just default to 8000
const port = process.env.express_port || 8000;

function startServer() {
    // we setup a server and listen from the express file
    const server = http.createServer(app);
    server.listen(port);
    console.log(`🚀 Started http server on port ${port} 🚀`)
}

module.exports = {startServer};