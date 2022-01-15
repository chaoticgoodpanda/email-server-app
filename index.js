const express = require('express');
require('./services/passport');


// create express app - used to setup config to listen for requests routed to express app from node side
// and route to different route handlers
const app = express();

// call routing -- when we require authRoutes.js file, returns function that we can call with the app object
require('./routes/authRoutes')(app);


// whenever Heroku runs our app it has ability to inject env variables that are in the JS runtime
// node runs on top of. Heroku only sets port at very end, so we need to check then
// PORT variable only works in production or need || statement
const PORT = process.env.PORT || 4000;

// node is listening on port 4000
app.listen(PORT);