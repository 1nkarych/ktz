const express = require('express');
const router = express.Router();

//гуглмапс 
router.get('/google-maps', (req, res) => {
    res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
});

module.exports = router;