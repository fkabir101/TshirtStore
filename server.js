const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
var paypal = require('paypal-rest-sdk');
const localStartegey = require('passport-local').Strategy

const db = require('./models');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));


app.use(session({secret: 'keyboard dog', resave:true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('client/build'));


// need to set up pasport authenticate

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tshirt", { useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true});

// ***************************************************
// setup paypal
let paypalTotal = ''
// cliend id: Aewf0fMi0_e9Y1r_xdhbTlYmJTk2J5H7gcmV7KOpa9hqklfPx8L6f-o0WN78CJcdHfiv34JWQd3BkAq1
// secret: EFempxYHDGOebLW0nTjRS3Fd2xwYv0tehtRcMresiH_dkHW1a82hVnov9cOQbnUhoJ_LkI2HlDvhHkUI
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWY4zd14vb9pmofaCzJRhfmbANoFiVvyBBMISyIurd8bXtaq7vuldRd7IEyJyBoGDO-EE933lJxXRp_k',
  'client_secret': 'ELIq7aUfGpNNBFgos30339K_ftZ_oLvAsejkDJ3jWw3o3jWy7Fxg4zYqPnhW1ZJlKS8kHD-7beZ9iA4q'
});

// paypal.configure({
//   'mode': 'live', //sandbox or live
//   'client_id': 'Aewf0fMi0_e9Y1r_xdhbTlYmJTk2J5H7gcmV7KOpa9hqklfPx8L6f-o0WN78CJcdHfiv34JWQd3BkAq1',
//   'client_secret': 'EFempxYHDGOebLW0nTjRS3Fd2xwYv0tehtRcMresiH_dkHW1a82hVnov9cOQbnUhoJ_LkI2HlDvhHkUI'
// });

  app.post('/paypal/pay', (req,res) =>{
    paypalTotal = req.body.total.toString()
    var create_payment_json = {
      "intent": "authorize",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3001/success",
          "cancel_url": "http://cancel.url"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": req.body.name,
                  "sku": "001",
                  "price": req.body.price,
                  "currency": "USD",
                  "quantity": req.body.quantity
              }]
          },
          "amount": {
              "currency": "USD",
              "total": req.body.total.toString()
          },
          "description": "Metal Gear Shirt"
      }]
  };
  
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log(error)
          throw error;
      } else {
        for(let i = 0; i< payment.links.length; i++){
          if(payment.links[i].rel ==='approval_url'){
            console.log(payment.links[i].href)
            return res.send(payment.links[i].href)
          }
        }
      }
    });
  })


  app.get('/success', (req,res) =>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions" : [{
        "amount" : {
          "currency": "USD",
          "total" : paypalTotal.toString()
        }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log("Get Payment Response");

          let user = payment.payer.payer_info.shipping_address;
          let model = {
            name: user.recipient_name,
            email: payment.payer.payer_info.email,
            address: user.line1,
            city: user.city,
            state: user.state,
            zip: user.postal_code,
            item: payment.transactions[0].item_list.items[0].name
          }
          console.log(model);
          db.Orders
          .create(model)
          .then(dbModel => {res.sendFile(path.join(__dirname, "../client/build/index.html"));})
          .catch(err => res.status(422).json(err))
          //res.redirect('/orders/create', dbModel)
      }
  });
  })




//**********************************************


app.use(routes)


app.listen(PORT, function(){
  console.log(`Listening on port: ${PORT}`)
})