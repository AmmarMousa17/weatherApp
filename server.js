projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

app.listen(port, () => {
    console.log(`The app is running on ${port}`);
});


app.get('/all', (request, response) => {
    response.send(projectData);
});


app.post('/post', addData);

function addData(request, response){

    let data = request.body;

    console.log('server side data ', data)
    let newWeatherData = {
        temperature: data.temp,date: data.date,userResponse: data.userResponse
    }
    Object.assign(projectData, newWeatherData);
    response.send(projectData);
}
