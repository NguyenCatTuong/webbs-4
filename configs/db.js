const pgp = require('pg-promise')()
// require('dotenv').config()
const { host, port, database, user, password, max } = require('./cnStr')
const cn = {
    host: host,
    port: port,
    database: database,
    user: user,
    password: password,
    max: max
}
const db = pgp(cn)

async function connect() {
    try {
        await db.connect()
        console.log('Connect DB Successfully');
    } catch (error) {
        console.log('Connect DB failure!');
    }
}

module.exports = { db, connect };