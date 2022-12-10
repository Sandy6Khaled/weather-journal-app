// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
/*Install the express by using npm install express from the terminal and using it in app */
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
/*Install the body parser and cors using npm install body-parser and npm intall cors */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
/*the server works on port 8000 and it is static with a call back function of lisyening that the server is working or not */
const port = 8000;
const server = app.listen(port,serverlistening);
function serverlistening (){
    console.log("the server is running");
    console.log(`running on localhost: ${port}`);
}

//Get route setup
/*get the data from projectData object as it acts as an end point for all routes */
app.get('/gettingWeather',(req,res)=>{
    res.json(projectData);
});

//POST route 
/*post data and send it to the projectData from the API as it gets the data from client server in the req.body */
app.post('/setWeather',(req,res)=>{
    console.log(req.body);
    dataEntry = {
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.feeling,
    }
    projectData = dataEntry;
    res.send();
})