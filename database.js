let dbState = {};

exports.run = function (globalState) {
    dbState = globalState;
};

let Sequelize = require('sequelize');

let set = {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};

// let sequelize = new Sequelize('mel', 'pavelkuzmin', '', set);
let sequelize = new Sequelize(process.env.DATABASE_URL);

let Team = sequelize.define('team', {
    name: Sequelize.STRING,
});

let Question = sequelize.define('question', {
    title: Sequelize.TEXT,
    answer: Sequelize.STRING,
    lat: Sequelize.FLOAT,
    lng: Sequelize.FLOAT
});

let Answer = sequelize.define('answer', {
    question: Sequelize.INTEGER,
    team: Sequelize.INTEGER,
    success: Sequelize.BOOLEAN,
    attempts: Sequelize.INTEGER
});

//TODO
Team.sync({force: true}).then(() => {
});

Question.sync({force: true}).then(() => {
});

Answer.sync({force: true}).then(() => {
});

exports.createTeam = function (team) {

    Team.create(team).then( function (result) {
        dbState.teams[result.id] = result;
    });
};

exports.createQuestion = function (question) {

    Question.create(question).then( function (result) {
        dbState.questions[result.id] = result;
    });
};

exports.answer = function (answer) {

    if (answer.id === undefined) {

        Answer.create(answer).then( function (result) {
            dbState.answers[answer.question + "|" + answer.team] = result;
        });

    } else {

        Answer.update(answer, { where: { id: answer.id } }).then((result) => {
            dbState.answers[answer.question + "|" + answer.team] = result;
        });
    }
};

function buildDatabase() {

    Team.findAll().then(teams => {

        teams.forEach((team) => {

            team = team.get({
                plain: true
            });

            dbState.teams[team.id] = team;
        });
    });

    Question.findAll().then(questions => {

        questions.forEach((question) => {

            question = question.get({
                plain: true
            });

            dbState.questions[question.id] = question;
        });
    });

    Answer.findAll().then(answers => {

        answers.forEach((answer) => {

            answer = answer.get({
                plain: true
            });

            dbState.answers[answer.question + "|" + answer.team] = answer;
        });
    });
}

buildDatabase();