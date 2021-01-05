const express = require('express');
const {
    exec
} = require('child_process');
const data = require('../../../../data');
const router = express.Router();

// launch obs on /api/obs/start
router.get('/', (req, res, next) => {
    // logic to see if we are running
    if (data.storage.obs_status == '1') {
        res.status(500).json({
            data: {
                attributes: {
                    data: "Already started OBS"
                }
            }
        });
        return;
    }
    const launchOBS = exec("cd \"C:\\Program Files\\obs-studio\\bin\\64bit\\\" && \"obs64.exe\"", (error, stdout, stderr) => {
        // catching errors 
        if (error) {
            console.log(error);
            return;
        }
    });
    res.status(200).json({
        data: {
            attributes: {
                data: "Started OBS"
            }
        }
    });
    // setting obs status
    data.storage.obs_status = '1';
    data.storage.obs_pid = launchOBS.pid;
    console.log(`Started OBS as a child process with PID:${data.storage.obs_pid}`);
    launchOBS.on('exit', function (code) {
        console.log(`Closed OBS child process it had the PID:${data.storage.obs_pid}`);
    });
});

module.exports = router;