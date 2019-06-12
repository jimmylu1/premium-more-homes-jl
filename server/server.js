const appCreator = require("./app.js");
// const mysqlConnection = require("../db/conn.js");
const client = require("../db/conn.js");

// // eslint-disable-next-line no-console
const app = appCreator.createApp(client);
app.listen(3005, () => console.log("Listening on port: 3005"));
