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

    // out.answers = state.answers;

    for (let i in out.teams) {
        out.teams[i].answers = {};

        for (let j in state.questions) {

            if (state.answers[j + "|" + i] !== undefined) {
                // console.log(state.answers[j + "|" + i].success);
                // console.log(state.answers[j + "|" + i].attempts);

                out.teams[i].answers[j] = {success: state.answers[j + "|" + i].success,
                    attempts: state.answers[j + "|" + i].attempts};
            }
        }
    }

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

app.get('/answers', function (request, response) {

    response.json(state.answers);
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

    let teamId = 1;
    let questionId = request.param('question');

    let serverAnswer = state.answers[request.param('question') + "|" + teamId];

    console.log();
    console.log(request.param('answer'));

    let correct = state.questions[request.param('question')]['answer'].toLowerCase() === request.param('answer').toLowerCase();

    if (serverAnswer !== undefined) {

        if (serverAnswer.attempts > 2) {

            //TODO
            response.sendStatus(400);
            return;
        }

        //bug here
        serverAnswer.attempts++;

        if (correct) {
            serverAnswer.success = true;
        }

    } else {

        serverAnswer = {};
        serverAnswer.team = teamId;
        serverAnswer.question = questionId;
        serverAnswer.attempts = 1;
        serverAnswer.success = correct;
    }

    database.answer(serverAnswer);

    response.sendStatus(200);
});


app.listen(process.env.PORT || 8001);