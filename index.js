const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
const  { connectMongoDb } = require("./Database/db");
const app = express();

connectMongoDb();

const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
app.use(bodyParser.json())

app.use(express.json());
app.use(cors({
    origin: 'https://steady-heliotrope-43be37.netlify.app', 
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
