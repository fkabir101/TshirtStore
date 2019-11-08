import axios from "axios";

export default {
  placeOrder: function (orderBody){
    return axios.post('/paypal/pay', orderBody)
  }
}