const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    vendor : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required:true
    },
    image :{
        type : String,
        required : false
    }

},{ timestamps : true })

const eventModel = mongoose.model("events",eventSchema);
module.exports = eventModel;