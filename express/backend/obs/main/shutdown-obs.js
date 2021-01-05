const express = require('express');
const {
    exec
} = require('child_process');
const data = require('../../../../data');
const router = express.Router();

// launch obs on /api/obs/start
router.get('/', (req, res, next) => {
    const killOBS = exec("taskkill /im obs64.exe && exit", (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            return;
        }
    });

    res.status(200).json({
        data: {
            attributes: {
                data: "Shutdown OBS"
            }
        }
    });
    // set obs storage
    data.storage.obs_status = '0';
    console.log(`Closed OBS child process is had the PID:${data.storage.obs_pid}`);
    killOBS.on('exit', function (close) {
        console.log(`The OBS child process has been closed PID:${data.storage.obs_pid}`);
    });
});

module.exports = router;