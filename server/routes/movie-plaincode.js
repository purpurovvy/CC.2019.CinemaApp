const express = require('express');
const app = express();
app.use(express.json());
const mongoose =require('mongoose');


mongoose.connect('mongodb://localhost/cinema') //conection to mongoDB; it returns a promise = .then is working
    .then(()=> console.log("Connected to MongoDB"))
    .catch(err => console.log('Could not connect to mongoDB...',err));

    const movieSchema = new mongoose.Schema({
        Title : String,
        Year : String,
        Rated : String,
        Released : String,
        Runtime : String,
        Genre : String,
        Director : String,
        Writer : String,
        Actors : String,
        Plot : String,
        Language : String,
        Country : String,
        Awards : String,
        Poster : String,
        Ratings : [{
            Source: String, Value: String
            }],
        Metascore : String,
        imdbRating : String,
        imdbVotes : String,
        imdbID : String,
        Type : String,
        DVD : String,
        BoxOffice : String,
        Production : String,
        Website : String,
        Response : String        
    });
    

// const showSchema = new mongoose.Schema({
//     startDate: Date,
//     endDate: Date,
//     movie: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Movie'
//       },
//     cast: {
//         room: String, //ref ?
//         castDate: Date,
//         castPlan: [String],
    
//     }

//   });




//CLASS CREATION:

const Movie = mongoose.model('Movie', movieSchema)
const Show = mongoose.model('Show', new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
      },
    cast: [{
        room: String, //ref ?
        castDate: Date,
        castPlan: [String],
    
    }]

  }))


async function createShow(startDate,endDate,movie){
    let show = new Show({
        startDate,
        endDate,
        movie,
        cast: [{room:"B",
        castDate: "2019-12-11",
        castPlan: ["12:00", "15:00", "18:00", "21:00"]
            },
            {room:"B",
                castDate: "2019-12-12",
                castPlan: ["12:00", "15:00", "18:00", "21:00"]
        },
        {room:"C",
                castDate: "2019-12-13",
                castPlan: ["14:00", "17:00", "20:00",]
        }]

    })
    let result = await show.save(); 
    console.log(result);
}





async function getMovies(){   
    let movies = await Movie
                   .find()
                   
   return movies;
   
   }
   
   async function getMoviesByType(type){
       console.log('Looking by type...')
        let movies = await Movie
                   .find({Genre : {$regex:type, $options:"i"}})
       return movies;
   }

app.get('/api/movies',async (req,res) =>{
    console.log('lakkaak');
    let result = await getMovies();
    if (!result) //404 
        return  res.status(404).send('The movies were not found')
    res.send(result);
   });


app.get('/api/movies/:type', async (req,res) =>{
    console.log(`My type is: ###### : ${req.params.type}`);
    let result = await getMoviesByType(req.params.type);
    res.send(result);
    // let result = await getMoviesByType(req.params.type);
    // if (!result) //404 
    //     return  res.status(404).send('The movies were not found')
    // res.send(result);
   });


async function listShows() { 
    const shows = await Show
      .find()
      .populate('movie') // because of name ref in schema and we want to display only name
    console.log(shows);
}
const port = process.env.PORT || 3000; //requested after deployment
app.listen(port, ()=> console.log(`Listening on port ${port}...`))

// createShow("2019-12-11","2019-12-13",'5de998fea2c52646dc2ac687');
listShows()