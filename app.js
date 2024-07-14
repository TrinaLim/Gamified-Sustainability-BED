//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE APP
//////////////////////////////////////////////////////
const app = express();
const bodyParser = require('body-parser')

//////////////////////////////////////////////////////
// USES
//////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended:false}));
/*•	This sets up middleware for the Express app. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
•	Here, it's using express.json() to parse incoming JSON requests and express.urlencoded() to parse incoming URL-encoded requests.
*/ 
app.use(bodyParser.json())
//////////////////////////////////////////////////////
// SETUP ROUTES
//////////////////////////////////////////////////////
const mainRoutes = require('./src/routes/mainRoutes');

app.use("/api", mainRoutes);
app.use("/", express.static('public')); 

//////////////////////////////////////////////////////
// EXPORT APP: This section exports the app instance so that it can be used in other files, like your index.js file. It allows you to start the server with the configured Express app.
//////////////////////////////////////////////////////
module.exports = app;
