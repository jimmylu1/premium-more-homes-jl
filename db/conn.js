const { Pool } = require("pg");
const redis = require("redis");
const config = {
  user: "postgres",
  password: "password",
  host: "ec2-18-222-152-193.us-east-2.compute.amazonaws.com",
  port: 5432,
  database: "more_homes"
};

const pool = new Pool(config);

//redis
const client = redis.createClient();

client.on("error", err => {
  console.log("Error " + err);
});

pool
  .connect()
  .then(() => console.log("Postgres connected!!"))
  .catch(err => console.log("error in db:", err));

const getListings = (req, res) => {
  const id = req.query.id;
  const query =
    "select (img, type, address, description, price, rating, votes) from homes inner join listings on homes.id = listings.listingid where mainid=$1";
  //GET FROM REDIS
  client.get(`${id}`, (err, result) => {
    if (result) {
      // console.log("result from redis", result);
      res.status(200).send(JSON.parse(result));
    } else {
      //GET FROM POSTGRES
      pool.query(query, [id], (err, results) => {
        if (err) {
          res.status(404).send(err);
        } else {
          client.set(`${id}`, JSON.stringify(results.rows));
          // console.log("result from postgres", results.rows);
          res.status(200).send(results.rows);
        }
      });
    }
  });
};

const addListing = (req, res) => {
  const { id, listingid } = req.body;
  const query = "insert into listings(mainid, listingid) values ($1, $2)";

  pool.query(query, [id, listingid], (err, results) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(201).send("Listing added!");
  });
};

const deleteListing = (req, res) => {
  const { id, listingid } = req.body;
  const query = "delete from listings where mainid=$1 and listingid=$2";

  pool.query(query, [id, listingid], (err, results) => {
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
