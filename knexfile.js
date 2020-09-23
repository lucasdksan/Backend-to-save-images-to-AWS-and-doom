const path = require('path');

module.exports = {
    client: 'mysql2',
    connection:{
        host : 'localhost',
        user : 'root',
        password : 'A10s20L14BcDAcDc305Vv',
        database : 'teste'     
    },
    migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
}