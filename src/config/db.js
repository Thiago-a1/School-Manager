const { Pool } = require('pg');

module.exports = new Pool({
  user: "postgres",
  password: "ntc0394",
  host: "localhost",
  port: 5432,
  database: "my_teacher"
})