const { Movie } = require('../db/models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // let result = await getMovies();
  console.log(`I'm looking for all movies in DB...`);
  let result = await Movie.find();
  if (!result)
    //404
    return res.status(404).send('The movies were not found');
  res.send(result);
});

router.get('/:type', async (req, res) => {
  console.log(`I'm looking for movies in ${req.params.type} genre`);
  let result = await Movie.find({ Genre: { $regex: req.params.type, $options: 'i' } });
  if (!result)
    //404
    return res.status(404).send('The movies were not found');
  res.send(result);
});

router.get('/title/:title', async (req, res) => {
  console.log(`I'm looking for movie: ${req.params.title}`);

  let result = await Movie.find({ Title: { $regex: req.params.title, $options: 'i' } });
  if (!result)
    //404
    return res.status(404).send('The movies were not found');

  res.send(result);
});

router.get('/get/genres', async (req, res) => {
  console.log(`I'm looking for all available genres...`);
  async function getGenreOfMovies() {
    let result = await Movie.find() // regards CLASS
      .select({ _id: 0, Genre: 1 });

    // console.log(result);
    let listOfGenres = [];
    result.forEach(item => (listOfGenres += item.Genre + ', '));
    listOfGenres = listOfGenres.split(', ');
    // console.log(listOfGenres);

    result = listOfGenres.filter(function(item, pos) {
      return listOfGenres.indexOf(item) == pos;
    }); //distinct values
    const garbageGenres = ['', 'N/A'];
    result = result.filter(item => garbageGenres.indexOf(item) === -1); //remove leftovers
    //  console.log(result);
    return result;
  }

  let result = await getGenreOfMovies();
  if (!result)
    //404
    return res.status(404).send('Something went wrong...');
  res.send(result);
});

module.exports = router;
