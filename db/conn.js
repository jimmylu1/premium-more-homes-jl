const { Client } = require("pg");
const config = require("./config.js");
const client = new Client(config);

client
  .connect()
  .then(() => console.log("db connected!!"))
  .catch(err => console.log("error in db:", err));

const getListings = (req, res) => {
  const mainid = req.params.mainid;
  const query =
    "select * from homes inner join listings on homes.id = listings.listingid where mainid=$1";

  client.query(query, [mainid], (err, results) => {
    if (err) {
      console.log("error getting listings");
      throw err;
    }
    res.status(200).send(results);
  });
};

const addListing = (req, res) => {
  const { mainid, listingid } = req.body;
  const query = "insert into listings(mainid, listingid) values ($1, $2)";

  client.query(query, [mainid, listingid], (err, results) => {
    if (err) {
      console.log("error posting");
      throw err;
    }
    res.status(201).send("New listing added");
  });
};

const deleteListing = (req, res) => {
  const { mainid, listingid } = req.body;
  const query = "delete from listings where mainid=$1 and listingid=$2";

  client.query(query, [mainid, listingid], (err, results) => {
    if (err) {
      console.log("error deleting");
      throw err;
    }
    res.status(200).send("Listing deleted");
  });
};

const updateListing = (req, res) => {
  const { price, id } = req.body;
  const query = "update homes set price=$1 where id=$2";

  client.query(query, [price, id], (err, results) => {
    if (err) {
      console.log("error updating price of listing");
      throw err;
    }
    res.status(200).send("Listing price updated");
  });
};

module.exports = {
  client,
  getListings,
  addListing,
  deleteListing,
  updateListing
};
