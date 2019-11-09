import axios from "axios";

export default {
  placeOrder: function (orderBody){
    return axios.post('/paypal/pay', orderBody).then( (response) => {      
        window.location.href= response.data; 
    })
  }
}