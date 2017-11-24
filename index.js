let results = {};

let express = require('express');
let path = require('path');

let app = express();

//STATIC WEB
app.use(express.static(path.join(__dirname, 'web')));

app.get('/results', function (request, response) {
    response.sendFile(path.join(__dirname, 'web/results.html'));
});

app.listen(process.env.PORT || 8001);

let database = require('./database.js');