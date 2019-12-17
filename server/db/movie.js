const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true, minlength: 1 },
  Year: { type: String, required: true, minlength: 4 },
  Rated: String,
  Released: String,
  Runtime: String,
  Genre: { type: String, required: true, minlength: 3 },
  Director: String,
  Writer: String,
  Actors: String,
  Plot: String,
  Language: String,
  Country: String,
  Awards: String,
  Poster: String,
  Ratings: [
    {
      Source: String,
      Value: String,
    },
  ],
  Metascore: String,
  imdbRating: String,
  imdbVotes: String,
  imdbID: String,
  Type: String,
  DVD: String,
  BoxOffice: String,
  Production: String,
  Website: String,
  Response: String,
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = {
    Title: Joi.string()
      .min(1)
      .required(),
    Year: Joi.string()
      .min(4)
      .required(),
    Genre: Joi.string()
      .min(3)
      .required(),
  };

  return Joi.validate(movie, schema);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validateMovie;
