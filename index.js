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
    let lon = request.param('lon');

    database.createQuestion({title: title, answer: answer});

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
app.get('/team/answer', function (request, response) {

    if (dbState.answers[team.id][answer.id]) {

    }
});


app.listen(process.env.PORT || 8001);