const pg = require("pg");
const { Pool } = pg;

const connect = process.env.DB_CONNECTION

const pool = new Pool({
    connectionString: connect
});

module.exports = pool;