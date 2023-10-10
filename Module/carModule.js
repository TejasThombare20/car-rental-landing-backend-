const mongoose = require("mongoose");
const { Schema } = mongoose;

const carSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  milage: {
    type: String,
  },
  image: {
    type: String,
  },

  price: {
    type: String,
  },
  
  like: {
    type: Boolean,
    default: false,
  },
  
});
const Cars = mongoose.model("cars", carSchema);

module.exports = Cars;
