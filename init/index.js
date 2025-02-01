const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then((res) => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL+'/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj)=>({
                  ...obj, owner:"675bc2f44e5ca0d4f5f7ef88"
    }));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();