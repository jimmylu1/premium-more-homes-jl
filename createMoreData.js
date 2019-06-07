const fs = require("fs");
const faker = require("faker");
const img = require("./server/images.js");
let dataStream = fs.createWriteStream("data.csv", {
  encoding: "utf8",
  flag: "a"
});

const writeMoreHomes = () => {
  const houseType = [
    "ENTIRE HOUSE",
    "ENTIRE APARTMENT",
    "PRIVATE ROOM",
    "SHARED ROOM"
  ];
  const description = [
    "Cozy house in friendly neiborhood",
    "Spacious apartment",
    "Sunny, Modern room",
    "Penthouse Studio",
    "Perfect Weekender"
  ];
  dataStream.write(
    "id, img, type, address, description, cost, rating, votes\n"
  );
  for (let i = 1; i <= 1000; i += 1) {
    let text =
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
      faker.random.number({ min: 0, max: 3500 });
    dataStream.write(text + "\n");
    if (i % 100000 === 0) {
      console.log(i);
    }
  }
  dataStream.end();
  console.log("done");
};

// const writeListings = () => {};

//create homes table
writeMoreHomes();

//create listings relationship table

// id, img, type, address, description, cost, rating, votes
// 1, https://s3-us-west-1.amazonaws.com/homes-pic/12.jpg,ENTIRE HOUSE,Calistafort,Perfect Weekender,5767,4.68,2768

// CREATE TABLE homes (id int NOT NULL,img text,type text,address text,description text,price int, rating numeric(1, 2), votes int)

// id, img, type, address, description, cost, rating, votes
// 1, https://s3-us-west-1.amazonaws.com/homes-pic/1.jpg , PRIVATE ROOM,Bernierfort,Perfect Weekender,2440,4.55,546
