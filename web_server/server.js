require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var path = require('path');
const port = process.env.express_port || 8000;


// Console log of anything hitting our server 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// CORS correction
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});

// loading our api routes
const startOBS_API = require('./api/obs/startup');
const shutdownOBS_API = require('./api/obs/shutdown');
const COMP_API = require('./api/comp');

// Serving Webpage
app.use('/', express.static(path.join(__dirname, '/static_web')));
// api route
app.get('/api', (req, res) => {
    res.status(200).json({
        data: {
            attributes: {
                message: `goto /help`
            }
        }
    });
});
app.use('/api/obs/start', startOBS_API);
app.use('/api/obs/shutdown', shutdownOBS_API);
app.use('/api/shutdown', COMP_API);

function startExpress() {
    app.listen(port, () => {
        console.log(`🚀 Started express server on port ${port} 🚀`);
    });
};

module.exports = {
    app,
    startExpress
};