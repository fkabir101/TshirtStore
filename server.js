const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const localStartegey = require('passport-local').Strategy

const app = express();

const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));

app.use(session({seceret: 'keyboard dog', resave:true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('client/build'));
app.use(routes);

// need to set up pasport authenticate

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tshirt", { useNewUrlParser: true });

app.listen(PORT, function(){
  console.log(`Listening on port: ${PORT}`)
})