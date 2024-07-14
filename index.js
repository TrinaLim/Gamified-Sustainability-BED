//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const app = require('./app.js');

//////////////////////////////////////////////////////
// SETUP ENVIRONMENT
//////////////////////////////////////////////////////
const PORT = 3000; //This section sets up the environment by defining the PORT variable. 

//////////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////////
app.listen(PORT,()=> { //Start Server Section:
    console.log(`App listening to port ${PORT}`);
});