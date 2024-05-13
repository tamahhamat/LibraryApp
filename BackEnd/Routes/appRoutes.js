const express = require('express');
const router = express.Router();
const path = require('path');

// Route to serve home.html
router.get('/library', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'views', 'home.html'));
});

module.exports = router;