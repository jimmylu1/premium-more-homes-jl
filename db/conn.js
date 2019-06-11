const { Client } = require("pg");
const config = require("./config.js");
const client = new Client(config);

client
  .connect()
  .then(() => console.log("db connected!!"))
  .catch(err => console.log("error in db:", err));

const getAll = (data, callback) => {
  const query =
    "select * from homes inner join listings on homes.id = listings.listingid where mainid = 1";
  client.query(query, (err, result) => {
    if (err) {
      console.log("error in db query");
      callback(err);
    } else {
      console.log("got from db");
      callback(null, result);
    }
  });
};

module.exports = { client, getAll };

// const mysql = require("mysql");
// // const config = require("./config.js");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "more_homes"
// });
// module.exports = connection;
