let database = require('./database.js');

let express = require('express');
let path = require('path');

let app = express();

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

app.get('/results', function (request, response) {
    response.sendFile(path.join(__dirname, 'web/results.html'));
});

app.get('/team/create', function (request, response) {
    database.createTeam({title: request.params.title})
});

app.listen(process.env.PORT || 8001);