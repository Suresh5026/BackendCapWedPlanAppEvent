
const mongoose =require('mongoose');
require("dotenv").config();


const DB_URI = process.env.MONGO_URL

const connectMongodb = async () => {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(DB_URI);
    console.log(mongoose.connection.readyState);
};
module.exports =  connectMongodb
