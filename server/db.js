const Pool = require('pg').Pool

require('dotenv').config()

const pool = new Pool({
    user: process.env.USERNAMEE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
    }
)

module.exports = pool