const Joi = require('joi');
const mongoose = require('mongoose');
// const {movieSchema} = require('./movie');
const {Movie} = require('./movie');

const Show = mongoose.model('Show', new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    
    movie: {
        // type: movieSchema,
        // required: true
        type: mongoose.Schema.Types.ObjectId,
        ref: Movie,
        required: true
      },
    cast: [{
        room: {
            type:String,
            min: 1,
            max: 50
        }, //ref ?
        castDate: {
            type:Date
        },
        castPlan: {
            type: [String]
        },
    
    }]

  }));

  function validateShow(show) {
    const schema = {
      startDate: Joi.date().min(4).max(20).required(),
      endDate: Joi.date().min(4).max(20).required(),
    };
  
    return Joi.validate(show, schema);
  }

  exports.Show = Show;
  exports.validate = validateShow;