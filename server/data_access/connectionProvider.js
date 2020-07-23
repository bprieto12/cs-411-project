const mysql = require('mysql');



exports.connectionProvider = (serverUrl, database) => {
    console.log(process.env.DB_USER_NAME);
    console.log(process.env.DB_USER_PWD);
    return mysql.createConnection({
        host: serverUrl,
        port: 3306,
        user: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PWD,
        database: database
    });
}