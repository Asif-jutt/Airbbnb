const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");
// initilize database
main().then(() => {
  console.log("Connection is build..");
}).catch (err=> {
  throw err;
})
async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}
async function initd() {
  await listing.deleteMany({});
  await listing.insertMany(initdata.data);
}
initd();