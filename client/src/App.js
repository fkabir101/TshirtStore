import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from './utils/api'

import Header from "./components/header/headerMain";
import LargeCard from "./components/shirtCards/largeCard"
import Success from './components/success'
import OrderPage from './components/orders/orderPage'
import Login from './components/login/loginpage'

class App extends Component {
  state = {
    quantity: 0,
    size: '',
    price: '',
    isLoggedIn: false,
  }
  loginCheck = () => {
    API
      .loginCheck()
      .then(res => {
        this.setState({
          isLoggedIn: res.data.isLoggedIn, username: res.data.username, email: res.data.email 
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false })
      })
  }
  addItem = (newQuantity, newSize, newPrice) =>{
    this.setState({
      quantity: newQuantity,
      size: newSize,
      price: newPrice
    }, () =>{
      console.log(this.state)
    })
  }

  render(){
    if (!this.state.isLoggedIn) {
      return (
          <Router>
            <div>
              <Header></Header>
              <Switch>
                <Route exact path="/" render={() => <LargeCard 
                  addItem = {this.addItem.bind(this)}
                  name = 'Shirt'
                  price = '20.00'
                />}/>
                <Route exact path="/finished" render={() => <Success />}/>
                <Route exact path="/login" render={() => <Login loginCheck={this.loginCheck}/>}/>
              </Switch>
            </div>
          </Router>

      );
    }
    else {
      return (
        <Router>
          <div>
            <Header></Header>
            <Switch>
              <Route exact path="/" render={() => <LargeCard 
                addItem = {this.addItem.bind(this)}
                name = 'Shirt'
                price = '20.00'
              />}/>
              <Route exact path="/finished" render={() => <Success />}/>
              <Route exact path="/orders" render={() => <OrderPage />}/>
            </Switch>
          </div>
        </Router>

    );
    }
  }

}

export default App;
