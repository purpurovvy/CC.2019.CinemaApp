const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile('../views/login.html');
});

module.exports = router;