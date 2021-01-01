const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.get('/', (req, res, next) => {
    const launchOBS = exec('shutdown -s -t 0', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
      });
    res.status(200).json({
        data: {
            attributes: {
                message: 'Shutting Down'
            }
        }
    });
    launchOBS.on('exit', function (code) {
        console.log("OBS has now been closed");
    });
});


module.exports = router;