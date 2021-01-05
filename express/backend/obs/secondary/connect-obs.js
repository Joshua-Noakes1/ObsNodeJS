const express = require('express');
const data = require('../../../../data');
const obs = require('../obs');
const router = express.Router();

// launch obs on /api/obs/start
router.get('/', (req, res, next) => {
    // error if obs is already connected
    if (data.storage.obs_connected == '1') {
        res.status(500).json({
            data: {
                attributes: {
                    data: "Already connected to OBS"
                }
            }
        });
        return;
    }
    // connecting to obs
    obs.obs.connect({
        address: process.env.obs_address,
        password: process.env.obs_password
    }).then(() => {
        res.status(200).json({
            data: {
                attributes: {
                    data: "Connected to OBS"
                }
            }
        });
        data.storage.obs_connected = '1';
    }).catch(err => {
        console.log("Failed to connect to OBS");
        console.log(err);
        return;
    });
});

module.exports = router;