const mysql = require("mysql");
// const config = require("./config.js");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "more_homes"
});
module.exports = connection;
