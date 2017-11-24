//caching

let state = {};
state.teams = {};
state.questions = {};
state.answers = {};

let database = require('./database.js');
database.run(state);


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


    let out = {};

    out.teams = state.teams;
    out.questions = state.questions;

    response.json(out);
});


//ADMIN
app.get('/question/create', function (request, response) {

    let title = request.param('title');
    let answer = request.param('answer');

    let lat = request.param('lat');
    let lng = request.param('lng');

    database.createQuestion({title: title, answer: answer, lat: lat, lng: lng});

    response.sendStatus(200);
});

//ADMIN
app.get('/questions', function (request, response) {

    response.json(state.questions);
});

//
app.get('/team/create/:name', function (request, response) {

    let name = request.params.name;

    if (name === null)
        return;

    database.createTeam({name: name});

    response.sendStatus(200);
});


//TEAM
app.get('/answer', function (request, response) {

    console.log(request.param('question'))
    console.log(request.param('answer'))

    // if (state.answers[team.id][answer.id]) {
    //
    // }

    response.sendStatus(200);
});


app.listen(process.env.PORT || 8001);