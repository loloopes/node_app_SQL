const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "my-secret-pw",
  database: "cep_lookup"
})

module.exports = connection;