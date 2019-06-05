const fs = require("fs");
const faker = require("faker");
const img = require("./server/images.js");
let dataStream = fs.createWriteStream("data1.csv");

const createData = () => {
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

  for (let i = 1; i <= 10000000; i += 1) {
    let text =
      i +
      "," +
      img.getImg() +
      "," +
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
  }
  dataStream.end();
};

createData();
