// const client = require("./conn.js");

// const getAll = (connection, callback) => {
//   const query = "SELECT * FROM homes ORDER BY RAND() LIMIT 15";
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// const addHouse = (connection, arr, callback) => {
//   const query =
//     "INSERT INTO homes (img, house_type, location, description, cost_per_night, rating, votes) VALUES ?";
//   connection.query(query, [arr], err => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null);
//     }
//   });
// };

// module.exports = {
//   getAll,
//   addHouse
// };
