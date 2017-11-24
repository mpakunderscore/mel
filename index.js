//caching
let teams = {};
let database = require('./database.js');
database.run(teams);


let express = require('express');
let path = require('path');
let app = express();


//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

app.get('/results', function (request, response) {
    response.sendFile(path.join(__dirname, 'web/results.html'));
});


//API WEB
app.get('/teams', function (request, response) {
    response.json(teams);
});

//ADMIN
app.get('/question/create', function (request, response) {

});

//TEAM
app.get('/team/create/:name', function (request, response) {

    let name = request.params.name;

    if (name === null)
        return;

    database.createTeam({id: name})

    response.json();
});

app.get('/team/answer', function (request, response) {
    // database.createTeam({title: request.params.title})
});


app.listen(process.env.PORT || 8001);