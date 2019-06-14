const fs = require("fs");
const faker = require("faker");
const img = require("../server/images.js");

let dataStream = fs.createWriteStream("noSQLData.csv", {
  encoding: "utf8",
  flag: "a"
});

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

const owner = () => {
  return faker.name.findName();
};

const getImg = () => {
  return img.getImg();
};

const type = () => {
  return houseType[Math.floor(Math.random() * houseType.length)];
};

const getDescription = () => {
  return description[Math.floor(Math.random() * description.length)];
};

const location = () => {
  return faker.address.city();
};

const cost = () => {
  return faker.random.number({ min: 35, max: 7500 });
};

const rating = () => {
  return (Math.random() * (5 - 0) + 0).toFixed(2);
};

const votes = () => {
  return faker.random.number({ min: 0, max: 3500 });
};

async function writeHomes() {
  let id = 0;
  for (let i = 1; i <= 10000000; i++) {
    let moreHomes =
      i +
      "|" +
      owner() +
      "|" +
      getImg() +
      "|" +
      type() +
      "|" +
      getDescription() +
      "|" +
      location() +
      "|" +
      cost() +
      "|" +
      rating() +
      "|" +
      votes() +
      "|";
    let listings = [];
    for (let x = 1; x <= 15; x++) {
      let listItems = {
        id: x,
        owner: owner(),
        img: getImg(),
        house_type: type(),
        description: getDescription(),
        location: location(),
        cost: cost(),
        rating: rating(),
        votes: votes()
      };
      listings.push(listItems);
    }
    listings = JSON.stringify(listings);
    moreHomes += listings;
    moreHomes = moreHomes.split('"').join("");
    let writeMoreHomes = dataStream.write(`${moreHomes}\n`);
    if (!writeMoreHomes) {
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

writeHomes();
