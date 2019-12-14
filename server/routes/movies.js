const {Movie, validate} = require('../db/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// async function getMovies(){   
//     let movies = await Movie.find()                
//    return movies;
// }

router.get('/',async (req,res) =>{
    // let result = await getMovies();
    let result = await Movie.find();
    if (!result) //404 
        return  res.status(404).send('The movies were not found')
    res.send(result);
});

// async function getMoviesByType(type){
//     console.log('Looking by type...')
//      let movies = await Movie
//                 .find({Genre : {$regex:type, $options:"i"}})
//     return movies;
// }

router.get('/:type', async (req,res) =>{
    // console.log(`My type is: ###### : ${req.params.type}`);
    // let result = await getMoviesByType(req.params.type);
    let result = await Movie.find({Genre : {$regex:req.params.type, $options:"i"}})
    if (!result) //404 
        return  res.status(404).send('The movies were not found')
    res.send(result);
   });

router.get('/title/:title', async (req,res) =>{ //ENDPOINT TO CHECK
    console.log(req.params.type);
    // let result = await Movie.find({Title : {$regex:req.params.type, $options:"i"}})
    // if (!result) //404 
    //     return  res.status(404).send('The movies were not found')
    let result = req.params.type;
    res.send(result);
   });





router.get('/get/genres',async (req,res) =>{

    async function getGenreOfMovies(){
        let result = await Movie.find() // regards CLASS 
                             .select({_id:0, Genre:1, })
     
         // console.log(result);
         let listOfGenres = [];
         result.forEach((item)=> listOfGenres += item.Genre +", ");
         listOfGenres = listOfGenres.split(", ");
         // console.log(listOfGenres);
     
         result = listOfGenres.filter( function(item,pos){return listOfGenres.indexOf(item)==pos}); //distinct values
         const garbageGenres = ['','N/A'];
         result = result.filter((item)=> (garbageGenres.indexOf(item) === -1)); //remove leftovers
         console.log(result);
         return result;
     }
    
    let result = await getGenreOfMovies();
    if (!result) //404 
        return  res.status(404).send('Something went wrong...')
    res.send(result);
   });

   module.exports = router;