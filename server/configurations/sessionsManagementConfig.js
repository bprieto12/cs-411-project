let {connectionProvider} = require("../data_access/connectionProvider");
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let serverSettings = require("../settings/serverSettings.js");

exports.sessionsManagementConfig = (app) => {
    // session.Session.prototype.login = function(user, cb) {
    //     console.log("in login module");
    //     const req = this.req;
    //     console.log(`this ${this}`);
    //     console.log(`session info in login: ${req.session}`);
    //     req.session.regenerate((err) => {
    //         console.log('error in login');
    //         console.log(err);
    //         if (err) {
    //             cb(err);
    //         }
    //     });
    //     req.session.userInfo = user;
    //     cb();
    // }

    const ttl = 24 * 60 * 60 * 1000;
    let dbConnection = connectionProvider(serverSettings.serverUrl, serverSettings.database);

    let storeOptions = {
        clearExpired: true,
        // how frequently expired sessions will be cleared in milliseconds  
        checkExpirationInterval: ttl,
        expiration: ttl,
        createDatabaseTable: true,
        schema: {
            tableName: "sessions",
            columnNames:  {
                session_id: "session_id",
                expires: "expires",
                data: "data"
            }
        }
    }

    let sessionStore = new MySQLStore(storeOptions, dbConnection);

    app.use(session({
        secret: 'secret',
        key: 'express.sessionId',
        store: sessionStore,
        resave: false,
        cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: true,
            maxAge: ttl
        },
        name: "id"
    }))
}