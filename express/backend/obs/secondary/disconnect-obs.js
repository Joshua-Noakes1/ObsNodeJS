const express = require('express');
const data = require('../../../../data');
const obs = require('../obs');
const router = express.Router();

// launch obs on /api/obs/start
router.get('/', (req, res, next) => {
    res.status(200).json({
        data: {
            attributes: {
                data: "Disconnected to OBS"
            }
        }
    });
    obs.obs.disconnect();
    data.storage.obs_connected = '0';
});

module.exports = router;