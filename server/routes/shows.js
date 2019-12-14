const {Show, validate} = require('../db/show'); 
// const {Movie} = require('../db/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const result = await Show.find().populate('movie').sort('startDate');
    res.send(result);
  });

module.exports = router; 