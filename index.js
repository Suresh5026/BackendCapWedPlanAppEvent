const express = require('express');
const  { connectMongoDb } = require("./Database/db");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

require('dotenv').config();

connectMongoDb();

const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://stellar-fenglisu-502361.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use("/auth", require('./Models/userController'));
app.use("/events",require('./Models/eventController'));
app.use("/bookings",require('./Models/BookingController'))
app.use("/decorate",require('./Models/decoController'));
app.use("/plan",require("./Models/Plancontroller"))


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
});
