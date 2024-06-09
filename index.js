const express = require('express');
const connectMongoDb = require("./Database/db");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

require('dotenv').config();

connectMongoDb();

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use("/api/auth", require('./Models/userController'));
app.use("/api/events",require('./Models/eventController'));
app.use("/api/bookings",require('./Models/BookingController'))

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
});
