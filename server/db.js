const Pool = require('pg').Pool

require('dotenv').config()

const pool = new Pool({
    user: 'unfrovlb',
    host: 'cornelius.db.elephantsql.com',
    password: 'uybzHkKrG8vsfE_3GySSkupP1z-sDWzS',
    port: 5432,
    database: 'unfrovlb'
    }
)

module.exports = pool