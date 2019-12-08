const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.sendFile('../views/register.html');
});

module.exports = router;