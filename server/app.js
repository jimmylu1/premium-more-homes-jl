const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
// const dbModels = require("../db/models.js");
const dbModels = require("../db/conn.js");

const createApp = dbConnection => {
  const app = express();

  app.use(compression());
  app.use(bodyParser.json());
  app.use(express.static(`${__dirname}/../public/dist`));

  app.get("/MoreHomes", (req, res) => {
    dbModels.getAll(dbConnection, (err, data) => {
      if (err) {
        console.log("error on server");
        res.status(500).send();
      } else {
        console.log("got more homes");
        res.status(200).send(data);
      }
    });
  });

  return app;
};

module.exports = {
  createApp
};
