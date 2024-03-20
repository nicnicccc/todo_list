const Pool = require('pg').Pool

require('dotenv').config()

const pool = new Pool({
    user: process.env.USERNAMEE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    database: 'todo_list'
    }
)

module.exports = pool