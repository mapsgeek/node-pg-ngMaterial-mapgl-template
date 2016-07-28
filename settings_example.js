/**
 * This is the settings file for
 * the DB.
 */

module.exports = {
    // Postgres Database Connection
    //pg: {
    //    server: 'localhost',
    //    port: '5432',
    //    database: 'db_name',
    //    user: 'user',
    //    password: 'password'
    //},
    port: 4000,
    authentication:false,
    auth: {secret: 'your secret'},
    github: {
        clientID: 'clientid',
        clientSecret: 'clientsecret',
        callbackURL: "http://127.0.0.1:4000/api/auth/github/callback"
    }
};