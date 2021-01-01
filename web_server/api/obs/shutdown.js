const { exec } = require('child_process');
const express = require('express');
const router = express.Router();
const data = require('../../../store/data');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "lol"
    })
    const launchOBS = exec(`taskkill /IM obs64.exe && exit`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stdout.includes("SUCCESS")) {
            console.log("Successfuly Shutdown OBS");
        } else {
            console.log("Faild to successfuly shutdown OBS");
        }
      });
});



module.exports = router;