const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

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
         owner: "69c4eee303f4ab4be9a9a038", 
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();

//The map function is used to create a new array which has all the properties
//of the objects in array plus every object will be added with owner.