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

// let sequelize = new Sequelize('forest', 'pavelkuzmin', '', set);
let sequelize = new Sequelize(process.env.DATABASE_URL);

let Team = sequelize.define('team', {
    id: { type: Sequelize.STRING, primaryKey: true }
});

let Question = sequelize.define('question', {
    title: Sequelize.TEXT,
    answer: Sequelize.TEXT
});

let Answer = sequelize.define('answer', {
    title: Sequelize.TEXT,
    answer: Sequelize.TEXT
});

// User.sync({force: false}).then(() => {
// User.create({id: "forest", trees: 0})
// });

// Idea.sync({force: true}).then(() => {
// });

let teams = {};

exports.teams = function (team) {

    Team.create(team).then( function (result) {

    });
};

exports.createTeam = function (team) {

    Team.create(team).then( function (result) {

    });
};

exports.updateTeam = function (team) {

    User.update({trees: forest.trees}, { where: { id: "forest" } }).then((result) => {});
};

function buildDatabase() {

    Team.findAll().then(teams => {

        teams.forEach((team) => {

            team = team.get({
                plain: true
            });

            teams.teams[user.id] = user;
        });
    });
}

buildDatabaseMap();