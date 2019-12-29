require('dotenv').config({ path: '.env' });
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const homeRouter = require('./routes/home');
const connect = require('./db/connection');
const initialize = require('./db/initializer');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const moviesRouter = require('./routes/movies');
const showsRouter = require('./routes/shows');
var cors = require('cors');



const main = async () => {
  const app = express();

  // Database configuration
  await connect();
  await initialize();

  // Global middlewares
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    }),
  );
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(morgan('dev'));
  app.use(cors({origin: '*'})); //allows any website to get data

  // Routes
  app.use('/', homeRouter);
  app.use('/api/register', registerRouter);
  app.use('/api/login', loginRouter);
  app.use('/api/movies', moviesRouter);
  app.use('/api/shows', showsRouter);

  // Listening
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;
  app.listen(port, host, () => console.log(`Server is listening on http://${host}:${port}\n`));
};

main();
