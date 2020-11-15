const Pool = require("pg").Pool;

const pool= new Pool({
    user:"mac",
    password:"123456",
    database:"mac",
    host:"localhost",
    port:"5432"
});
module.exports = pool;