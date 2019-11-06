const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    index: true
  },
  address: {
    type: String,
    required : true
  },
  city: {
    type: String,
    required : true
  },
  zip:{
    type: Number,
    required: true
  },
  shipStatues: {
    type: Boolean,
    default: false
  }
})

const Order = mongoose.model("Order", OrderSchema);
OrderSchema.index('email')
module.exports = Order;