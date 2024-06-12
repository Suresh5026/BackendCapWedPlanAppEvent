const mongoose = require('mongoose');


const DecorationSchema = mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  price : {
    type : Number,
    required: true
  }

}, { timestamps: true });

const Decoration = mongoose.model('decorations',DecorationSchema)
module.exports = Decoration;