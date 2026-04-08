const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

const MONGO_URL = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    }).catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
         ...obj, 
         owner: new mongoose.Types.ObjectId("69d524d79292f13b41d62418") 
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();

//The map function is used to create a new array which has all the properties
//of the objects in array plus every object will be added with owner.