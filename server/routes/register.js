const bcrypt = require('bcrypt');
const {User, validate} = require('../db/models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
  const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
     if (user) return res.status(400).send('User already registered.')

     user = new User({
       email: req.body.email,
       password: req.body.password,
       firstName: req.body.firstName,
       lastName: req.body.lastName
     });
     const salt = await bcrypt.genSalt(6);
     user.password = await bcrypt.hash(user.password,salt);
    

     await user.save();
     res.send(`Hello ${req.body.firstName}, your account with e-mail: ${req.body.email} has been created.` );
});

module.exports = router;
