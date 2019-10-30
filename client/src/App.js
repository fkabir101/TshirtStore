import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/home";
import CheckOutPage from "./components/pages/checkout"
import Header from "./components/header/headerMain";


class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path="/" render={() => <HomePage/>}/>
            <Route exact path="/checkout" render={() => <CheckOutPage/>}/>
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
