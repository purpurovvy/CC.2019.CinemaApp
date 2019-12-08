const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => res.sendFile("../views/login.html"))

router.get("/register", (req, res) => res.sendFile("../views/register.html"))

module.exports = router;