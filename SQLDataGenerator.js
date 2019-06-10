const fs = require("fs");
const faker = require("faker");
const img = require("./server/images.js");
//homes
let dataStream = fs.createWriteStream("data2.csv", {
  encoding: "utf8",
  flag: "a"
});
//listings
let dataStream2 = fs.createWriteStream("data.csv", {
  encoding: "utf8",
  flag: "a"
});
//users
let dataStream3 = fs.createWriteStream("data1.csv", {
  encoding: "utf8",
  flag: "a"
});

//write main homes
async function writeMoreHomes() {
  const houseType = [
    "ENTIRE HOUSE",
    "ENTIRE APARTMENT",
    "PRIVATE ROOM",
    "SHARED ROOM"
  ];
  const description = [
    "Cozy house in friendly neiborhood",
    "Spacious apartment",
    "Sunny Modern room",
    "Penthouse Studio",
    "Perfect Weekender"
  ];
  dataStream.write(
    "id, img, type, address, description, cost, rating, votes, users\n"
  );
  for (let i = 1; i <= 10000000; i += 1) {
    let text =
      i +
      "," +
      img.getImg() +
      " , " +
      houseType[Math.floor(Math.random() * houseType.length)] +
      "," +
      faker.address.city() +
      "," +
      description[Math.floor(Math.random() * description.length)] +
      "," +
      faker.random.number({ min: 35, max: 7500 }) +
      "," +
      (Math.random() * (5 - 0) + 0).toFixed(2) +
      "," +
      faker.random.number({ min: 0, max: 3500 }) +
      "," +
      Math.floor(1 + Math.random() * 9999999);
    let writeHome = dataStream.write(text + "\n");
    if (!writeHome) {
      await new Promise(resolve => {
        dataStream.once("drain", resolve);
      });
    }
    if (i % 100000 === 0) {
      console.log(i);
    }
  }
  dataStream.end();
  console.log("done");
}

//write listings
// const writeListings = () => {
async function writeListings() {
  dataStream2.write("mainID, listingID\n");
  for (let i = 1; i < 1000; i++) {
    for (let j = 1; j <= 15; j++) {
      let listing = (i - 1) * 15 + j;
      let joined = i + " , " + Math.floor(1 + Math.random() * 9999999);
      let writeList = dataStream2.write(joined + "\n");
      if (!writeList) {
        await new Promise(resolve => {
          dataStream2.once("drain", resolve);
        });
      }
    }
    if (i % 100000 === 0) {
      console.log(i);
    }
  }
  dataStream2.end();
  console.log("done with listings");
}

async function writeUsers() {
  dataStream3.write("id, name, email\n");
  for (let i = 1; i < 10000000; i++) {
    let users = i + "," + faker.name.findName() + "," + faker.internet.email();
    let writeUser = dataStream3.write(users + "\n");
    if (!writeUser) {
      await new Promise(resolve => {
        dataStream3.once("drain", resolve);
      });
    }
    if (i % 1000000 === 0) {
      console.log(i);
    }
  }
  dataStream3.end();
  console.log("done");
}

//create homes table
// writeMoreHomes(); //complete data in data2.csv

//create listings relationship table
writeListings(); // complete data in data.csv

//create users who own each home
// writeUsers();

// CREATE TABLE homes (id int NOT NULL,img text,type text,address text,description text,price int, rating numeric(1, 2), votes int)

// id, img, type, address, description, cost, rating, votes
// 1, https://s3-us-west-1.amazonaws.com/homes-pic/1.jpg , PRIVATE ROOM,Bernierfort,Perfect Weekender,2440,4.55,546

// COPY test(img, type, address, description, price, rating, votes) FROM '/Users/Jimmy/hack-reactor/sdc/premium-more-homes-jl/data.csv' CSV HEADER;
