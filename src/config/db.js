const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    idleTimeoutMillis: 30000,           
    connectionTimeoutMillis: 2000
});

module.exports = pool;