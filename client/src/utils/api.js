import axios from "axios";

export default {
  placeOrder: function (orderBody){
    return axios.post('/paypal/pay', orderBody).then( (response) => {      
        window.location.href= response.data; 
    })
  },
  findOrder: function(){
    return axios.get('/orders/findAll')
  },
  update: function(id, updateData){
    return axios.put(`/orders/update/${id}`, updateData)
  },
  delete: function(id){
    return axios.delete(`/orders/update/${id}`)
  },
  login: function(loginCreds) {
    return axios.post('/user/login', loginCreds);
  },
  loginCheck: function() {
    return axios.get('/user/login');
  },
}