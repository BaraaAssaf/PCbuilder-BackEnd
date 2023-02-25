const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "baraa",
    database: "PCBuilderdp"
})

module.exports = client