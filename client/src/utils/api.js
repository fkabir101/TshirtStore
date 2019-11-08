import axios from "axios";

export default {
  placeOrder: function (orderBody){
    return axios.post('/pay', orderBody).then( (response) => {      
        window.location.href= response.data; 
    })
  }
}