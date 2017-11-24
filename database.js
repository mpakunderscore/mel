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

Team.sync({force: false}).then(() => {
});

Question.sync({force: true}).then(() => {
});

Answer.sync({force: true}).then(() => {
});

let teams = {};

exports.createTeam = function (team) {

    Team.create(team).then( function (result) {
        teams[result.id] = result;
    });
};

exports.updateTeam = function (team) {

    // User.update({trees: forest.trees}, { where: { id: "forest" } }).then((result) => {});
};

function buildDatabase() {

    Team.findAll().then(teams => {

        teams.forEach((team) => {

            team = team.get({
                plain: true
            });

            teams[team.id] = team;
        });
    });
}

buildDatabase();