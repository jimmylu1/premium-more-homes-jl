const { Pool } = require("pg");
const config = require("./config.js");
const pool = new Pool(config);

pool
  .connect()
  .then(() => console.log("db connected!!"))
  .catch(err => console.log("error in db:", err));

const getListings = (req, res) => {
  const mainid = req.params.mainid;
  const query =
    "select (img, type, address, description, price, rating, votes) from homes inner join listings on homes.id = listings.listingid where mainid=$1";
  pool.query(query, [mainid], (err, results) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(results);
  });
};

const addListing = (req, res) => {
  const { mainid, listingid } = req.body;
  const query = "insert into listings(mainid, listingid) values ($1, $2)";

  pool.query(query, [mainid, listingid], (err, results) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(201).send("Listing added!");
  });
};

const deleteListing = (req, res) => {
  const { mainid, listingid } = req.body;
  const query = "delete from listings where mainid=$1 and listingid=$2";

  pool.query(query, [mainid, listingid], (err, results) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send("Listing deleted!");
  });
};

const updateListing = (req, res) => {
  const { price, id } = req.body;
  const query = "update homes set price=$1 where id=$2";

  pool.query(query, [price, id], (err, results) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send("Listing updated!");
  });
};

module.exports = {
  pool,
  getListings,
  addListing,
  deleteListing,
  updateListing
};
