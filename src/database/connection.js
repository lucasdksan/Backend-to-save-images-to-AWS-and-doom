const knex = require('knex');
const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'A10s20L14BcDAcDc305Vv',
        database: 'teste',
    },
    useNullAsDefault: true,
});

module.exports = db;