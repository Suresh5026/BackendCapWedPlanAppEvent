const mongoose = require("mongoose");
const planSchema = mongoose.Schema(
  {
    event_name: {
      type: String,
      require: true,
    },
    event_date : {
        type: Date,
        required: true,
    },
    event_todos : {
        type : String,
        required : true
    },
    selection : {
        type : String,
        required: true
    }
  },
  { timestamps: true }
);

const Planmodel =mongoose.model("plans",planSchema);
module.exports = Planmodel