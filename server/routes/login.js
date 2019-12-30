const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../db/models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
  const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
     if (!user) return res.status(400).send(`Invalid e-mail or password`);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(`Invalid e-mail or password`);

    res.send('You are successfully logged in');
});

function validate(user) {
    const schema = {
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email({ minDomainAtoms: 2 }),
      password: Joi.string()
        .min(5)
        .max(1024)
        .required()
    };
  
    return Joi.validate(user, schema);
  }

module.exports = router;
