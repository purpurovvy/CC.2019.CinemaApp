const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../db/models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/wallet/:email', async (req,res)=>{
    
    let result = await User.find({email:{ $regex: req.params.email, $options: 'i' }})
                            .select({ _id: 0, wallet: 1 })
    if (!result)
    //400
    return res.status(400).send('User not found');

  res.send(result);

});

router.post('/cashFlow/', async (req,res)=>{
    const {error} = validate(req.body);
    // BODY EXAMPLE: 
    //{
    //     "_id": "5e0e5df61afdec1b34db0166",
    //     "role": "user",
    //     "email": "test3@gmail.com",
    //     "iat": 1578051313
    //      "value": 150
    //   }

    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send(`User not found`);
     user.wallet = 1*user.wallet + req.body.value;
     await user.save();
   
     res.send(user.wallet);
});


router.post('/', async (req,res)=>{

  
      let user = await User.findOne({email:req.body.email});
       if (!user) return res.status(400).send(`Invalid e-mail or password`);
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).send(`Invalid e-mail or password`);
      const token = user.generateAuthToken();
      
      res.send(token);
  });

function validate(user) {
    const schema = {
        _id: Joi.string(),
        iat: Joi.number(),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email({ minDomainAtoms: 2 }),
     role: Joi.string().valid("admin", "user").required()
            .min(4)
            .max(4),
     value: Joi.number()
    };
  
    return Joi.validate(user, schema);
  }

module.exports = router;