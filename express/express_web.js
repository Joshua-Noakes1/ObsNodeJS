// loading express morgan body-parser and starting app
console.log('Loading ONJS express server');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var path = require('path');
const app = express();


// loading app the files and endpoints
const startOBS_API = require('./backend/obs/main/start-obs');
const stopOBS_API = require('./backend/obs/main/shutdown-obs');
const connectOBS_API = require('./backend/obs/secondary/connect-obs');
const disconnectOBS_API = require('./backend/obs/secondary/disconnect-obs');

// console log stuff hitting our express using morgan 
app.use(morgan('dev'))
// using Body-Parser to encode our json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Cors please dont talk to me about this it is annoying 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        next();
    }
    next();
});

// Server endpoints
app.use('/', express.static(path.join(__dirname, '/frontend')));
app.use('/api/obs/start', startOBS_API);
app.use('/api/obs/stop', stopOBS_API);
app.use('/api/obs/connect', connectOBS_API);
app.use('/api/obs/disconnect', disconnectOBS_API);

// Errors
// Handle 404 not found
app.use((req, res, next) => {
    const error = new Error('404 - Page Not Found');
    error.status = 404;
    next(error);
});
// Handle anything else thats not a 404 now found
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        data: {
            attributes: {
                error: error.message,
                error_status: error.status
            }
        }
    });
});


module.exports = app;