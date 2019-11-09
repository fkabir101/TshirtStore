import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/header/headerMain";
import LargeCard from "./components/shirtCards/largeCard"

class App extends Component {
  state = {
    quantity: 0,
    size: '',
    price: ''
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
    return (
        <Router>
          <div>
            <Header></Header>
            <Switch>
              <Route exact path="/" render={() => <LargeCard 
                addItem = {this.addItem.bind(this)}
                name = 'Shirt'
                price = '9.99'
              />}/>
            </Switch>
          </div>
        </Router>

    );
  }

}

export default App;
