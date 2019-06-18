const newrelic = require("newrelic");
const appCreator = require("./app.js");
const pool = require("../db/conn.js");

const app = appCreator.createApp(pool);
app.locals.newrelic = newrelic;
app.listen(3005, () => console.log("Listening on port: 3005"));
