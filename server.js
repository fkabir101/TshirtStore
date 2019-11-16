const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
var paypal = require('paypal-rest-sdk');
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config();
const db = require('./models');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));


app.use(session({secret: 'keyboard dog', resave:true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('client/build'));


// need to set up pasport authenticate

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tshirt", { useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true});

// ***************************************************
// setup paypal
let paypalTotal = ''

paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': process.env.PAYPAL_API,
  'client_secret': process.env.PAYPAL_SECRET
});

  app.post('/paypal/pay', (req,res) =>{
    paypalTotal = req.body.total.toString()
    var create_payment_json = {
      "intent": "authorize",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://www.newchallenger.store/success",
          "cancel_url": "http://www.newchallenger.store"
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
          "description": "Clothing"
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
    console.log('gets here')
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
            item: payment.transactions[0].item_list.items[0].name,
            quantity:payment.transactions[0].item_list.items[0].quantity
          }
          console.log(model);
          db.Orders
          .create(model)
          .then(dbModel => {res.redirect('http://www.newchallenger.store/finished');})
          .catch(err => res.status(422).json(err))
          //res.redirect('/orders/create', dbModel)
      }
  });
  })

//'http://www.newchallenger.store/finished'


//**********************************************


app.use(routes)


app.listen(PORT, function(){
  console.log(`Listening on port: ${PORT}`)
})