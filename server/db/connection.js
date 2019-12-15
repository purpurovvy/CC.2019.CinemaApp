const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/cinema') //conection to mongoDB; it returns a promise = .then is working
//     .then(()=> console.log("Connected to MongoDB"))
//     .catch(err => console.log('Could not connect to mongoDB...',err));
// const port = process.env.PORT || 3000; //requested after deployment
// app.listen(port, ()=> console.log(`Listening on port ${port}...`))

const getByMode = (prod, dev) => (process.env.TEST_ENV || process.env.NODE_ENV ? dev : prod);

const config = {
    host: getByMode(process.env.DB_HOST, process.env.DB_HOST_DEV),
    port: getByMode(process.env.DB_PORT, process.env.DB_PORT_DEV),
    name: getByMode(process.env.DB_NAME, process.env.DB_NAME_DEV),
    username: getByMode(process.env.DB_USER, process.env.DB_USER_DEV),
    password: getByMode(process.env.DB_PASS, process.env.DB_PASS_DEV),
    protocol: getByMode(process.env.DB_PROT, process.env.DB_PROT_DEV),
};


const mongoUrl = getByMode(`${config.protocol}://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`,
                            `${config.protocol}://${config.username}:${config.password}@${config.host}/${config.name}?retryWrites=true&w=majority`);
                


const connectionOnSuccessHandler = connection => {
    console.log(`[MongoDB] Connection to ${mongoUrl} created`);
    return connection;
};

const connectionOnErrorHandler = e => {
    console.log(`[MongoDB] Connection to ${mongoUrl} failed with error: ${e}`);
    return Promise.reject(e);
};

const defaultOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

const connect = (options = defaultOptions) => {
    return mongoose.connect(`${mongoUrl}`, options).then(connectionOnSuccessHandler, connectionOnErrorHandler);
};

module.exports = connect;


