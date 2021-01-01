const express = require('express');
const router = express.Router();
const data = require('../../../store/data');
const { exec } = require('child_process');

router.get('/', (req, res, next) => {
    const launchOBS = exec('cd \"C:\\Program Files\\obs-studio\\bin\\64bit\\\" && \"obs64.exe\"', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
      });
    data.data.obs_pid = launchOBS.pid;
    res.status(200).json({
        data: {
            attributes: {
                message: 'Starting OBS'
            }
        }
    });
    console.log("OBS has now been opened");
    launchOBS.on('exit', function (code) {
        console.log("OBS has now been closed");
    });
});


module.exports = router;