const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const dbModels = require("../db/conn.js");

const createApp = client => {
  const app = express();

  app.use(compression());
  app.use(bodyParser.json());
  app.use(express.static(`${__dirname}/../public/dist`));

  app.get("/MoreHomes/:mainid", dbModels.getListings);
  app.post("/MoreHomes", dbModels.addListing);
  app.delete("/MoreHomes", dbModels.deleteListing);
  app.put("/MoreHomes", dbModels.updateListing);

  return app;
};

module.exports = {
  createApp
};
