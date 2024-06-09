
const mongoose =require('mongoose');
require("dotenv").config();


const DB_URI = 'mongodb://localhost:27017/weddingevents'

const connectMongodb = async () => {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(DB_URI);
    console.log(mongoose.connection.readyState);
};
module.exports =  connectMongodb
