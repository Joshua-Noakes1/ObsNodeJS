console.log('Loading ONJS index');
// ONJS is a full stack app used for controling OBS over a browser while still having full control over it with a JSON api https://github.com/Joshua-Noakes1/ObsNodeJS
// Loading dotenv and the express server
require('dotenv').config();
const server = require('./express/server');

// starting the http server
server.startServer();