require('dotenv').config();
const web_server = require('./web_server/server');

console.log(`----------\nLoading ONJS`);
web_server.startExpress();