const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    index: true
  },
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
  item:{
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  status:{
    type: String,
    default: 'Order Taken'
  }

})

const Order = mongoose.model("Order", OrderSchema);
OrderSchema.index('email')
module.exports = Order;